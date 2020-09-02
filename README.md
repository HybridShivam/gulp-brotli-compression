# gulp-brotli-compression
Google's Brotli is better at compression than the standard gZIP as the content-encoding for HTTP requests. 

This script allows you to batch compress `css, js, svg, csv, json etc.` files beforehand to facilitate super-fast static content delivery (With some web server tweaks).

# Introduction
**What is Brotli?**

Named after a Swiss baked good, Brotli is a compression algorithm that Google released back in 2013. As of late 2020 most modern browsers support Brotli.
Essentially, Brotli has the potential to offer roughly 20-26% better compression ratios than gZip at comparable speeds, which is great news for those of us who care about performance.

**How it Works With the Browser**

Whenever a browser makes a request to the server, it lets the server know what kind of compressed content it can decompress using the `Accept-Encoding` header, like so:

`Accept-Encoding: "gzip, deflate"`

Then, when the server responds with the content, it tells the the browser what compression was actually used (if any) with the `Content-Encoding` header. Like so:

`Content-Encoding: "gzip"`

In the case of browsers that support Brotli (e.g. Chrome, Firefox), the `Accept-Encoding` header may look like this:

`Accept-Encoding: "gzip, deflate, br"`

And if the server is using the Brotli to compress the file it serves, it will use `br` as the `Content-Encoding` response

`Content-Encoding: "br"`

**But There's a catch:**

Compressing bigger files at higher compression levels can take a few seconds which is not acceptable.

So for static content, we can precompress the files into the brotli format and simply serve them to the user, this reduces the performance cost as static content is not compressed again and again.


# Getting Started:

**Setting up the environment:**
1. Install Node.js and use `node -v` to check version.
1. IMP Note: You might need to use sudo depending on the npm configuration.
1. Clone or download this repo.
1. Run `npm install` inside this project folder to install all dependencies.

**Running the Code**
1. Put the files you want to compress in the `/data` directory.
1. Run `gulp compress` in the base directory of the Repo.
1. Generated `.br` Files will be saved in the same `/data` directory alongside the original files.

**Deploying the website code**
1. You can simply paste all the files(including the original and the .br ones) in your `DocumentRoot` as you normally do.
1. Make sure to setup the web server to respond to `Accept-Encoding: "gzip, deflate, br"` requests differently with the `.br` extension files as shown below:

**Configuring the server**
1. Make sure brotli compressed files exist right next to the normal files in respective folders. E.g. if you have a file `/var/www/html/style.css` there should also be `/var/www/html/style.css.br`
1. Copy the `.htaccess` file from the repo to the `DocumentRoot` as well. This `.htaccess` file is already configured to serve pre-compressed `.br` files.
