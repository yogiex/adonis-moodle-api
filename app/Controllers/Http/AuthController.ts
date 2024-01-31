import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
    async login({auth, request, response}: HttpContextContract){
        const username = request.input('username')
        const password = request.input('password')

       const token = await auth.use('api').attempt(username, password)
       return token
    // return response.json({
    //     token: "eyqweqweqwe"
    // })
    }
}
