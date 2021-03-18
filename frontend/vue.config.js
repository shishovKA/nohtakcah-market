module.exports = {
    transpileDependencies: ["vuetify"],
    publicPath:
        process.env.NODE_ENV === "production" ? "/nohtakcah-market/" : "/",
        outputDir: process.env.NODE_ENV === "production" ? "../deploy/dist" : "../backend/dist"
}
