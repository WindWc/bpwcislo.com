module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("assets");

  // Cache-busting token regenerated each build. Appended to long-cached
  // CSS/JS asset URLs so deploys don't get masked by an old immutable
  // copy in the browser cache.
  eleventyConfig.addGlobalData("assetVersion", Date.now().toString(36));

  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByTag("post").reverse();
  });

  eleventyConfig.addFilter("readingTime", function(content) {
    const text = (content || '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<[^>]+>/g, '')
      .replace(/\{#[\s\S]*?#\}/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    const words = text ? text.split(/\s+/).length : 0;
    const minutes = Math.ceil(words / 230);
    return minutes + " min read";
  });

  eleventyConfig.addFilter("dateDisplay", function(date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  });

  eleventyConfig.addFilter("dateISO", function(date) {
    var d = (date === "now" || !date) ? new Date() : new Date(date);
    return d.toISOString().split('T')[0];
  });

  eleventyConfig.addFilter("dateRFC822", function(date) {
    var d = (date === "now" || !date) ? new Date() : new Date(date);
    return d.toUTCString();
  });

  eleventyConfig.addShortcode("year", function() {
    return new Date().getFullYear().toString();
  });

  eleventyConfig.addFilter("head", function(array, n) {
    if (!Array.isArray(array)) return array;
    return array.slice(0, n);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
