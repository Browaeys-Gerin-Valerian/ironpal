export const config = {
    port: process.env.PORT || 3000,
    base_url: process.env.BASE_URL,
    allowed_origin: process.env.ALLOWED_ORIGIN,
    jwt_secret: process.env.JWT_SECRET as string
}