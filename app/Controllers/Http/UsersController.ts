import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

// import { HttpContext } from '@adonisjs/core/http'
import Database from '@ioc:Adonis/Lucid/Database'


export default class UsersController {
    async users({response,request}: HttpContextContract){
        const users = await Database
                            .from('mdl_user')        
                            .select('*')

        return response.json({users})
    }

    async countUser({request, response}: HttpContextContract) {
        const users = await Database
                            .rawQuery('select count(id) from mdl_user;')

        return response.json({users})
                            
    }
}
