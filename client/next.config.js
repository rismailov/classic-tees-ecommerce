/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        formats: ['image/webp'],
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                // pathname: '/api/products',
            },
        ],
    },
    // modularizeImports: {
    //     '@react-icons/all-files/fi': {
    //         transform: '@react-icons/all-files/fi/{{member}}',
    //     },
    // },
}
