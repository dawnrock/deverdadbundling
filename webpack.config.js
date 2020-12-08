const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");
const basePath = __dirname;


module.exports = { 
    context: path.join(basePath, 'src'), 
    resolve: {
        extensions: ['.js', '.jsx', '.tsx'],
    },
                       
    entry: {
        app: './index.tsx',
        appStyles: ['./mystyles.scss', './averageComponentStyles.scss','./totalScoreComponentStyles.scss'],
        vendorStyles: ['../node_modules/bootstrap/dist/css/bootstrap.css'],
      },
    output: {
        filename: "[name].[chunkhash].js",
        path: path.resolve(process.cwd(), "dist"),// Misma función que línea 9.
        publicPath: "/",
    },
    module: {
        rules: [
            { 
                test: /\.tsx?$/, 
                exclude: /node_modules/, 
                loader: "babel-loader", 
            },
            {
                test: /\.(png|jpg)$/,
                type: "asset/resource",
            },
            {
                test: /\.html$/,
                loader: "html-loader",
            },
            { 
                test: /\.css$/, 
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            import: false,
                            modules:{
                                exportLocalsConvention: "camelCase",
                                localIdentName: "[path][name]__[local]--[hash:base64:5]",
                                localIdentContext: path.resolve(__dirname, "src"),
                                localIdentHashPrefix: "my-custom-hash",
                            },
                        },                        
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass"),
                        },
                    },
                ],
            }, 
        ],
    },
    plugins: [ 
        new HtmlWebpackPlugin({ 
            filename: "index.html", // nombre en dist
            template: "index.html", // nombre en el src 
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash].css",
            chunkFilename: "[id].css",
        }),
    ], 
};