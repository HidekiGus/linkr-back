export async function validateToken(req, res, next) {
    try {
        const { authorization } = req.headers;
        const token = authorization?.replace('Bearer ', '');
        const {rows: session} = await findSession(token);
        
    } catch (error) {
        
    }
}