module.exports = {
    transpileDependencies: ["vuetify"],
    publicPath: process.env.NODE_ENV === "production" ? "/static/" : "/",
    outputDir: "../deploy/dist",
}
