/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "www.whitehouse.gov",
            },
            {
                protocol: "http",
                hostname: "localhost"
            }
        ]
    }
};

export default nextConfig;
