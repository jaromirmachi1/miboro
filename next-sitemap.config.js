/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.miboro.cz",
  generateRobotsTxt: true,
  exclude: ["/studio", "/studio/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/studio/"],
      },
    ],
  },
};
