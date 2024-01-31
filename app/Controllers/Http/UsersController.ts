import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'

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

    async lastaccess({response}){
        const users = await Database
                            .rawQuery('select mdl_user.id, mdl_user.username , FROM_UNIXTIME(mdl_user_lastaccess.timeaccess) from mdl_user inner join mdl_user_lastaccess on mdl_user_lastaccess.userid = mdl_user.id')

        return response.json({users})
        
    }
    async pagination({response} : HttpContextContract) {
        const users = await Database
                           .from('mdl_user')
                           .select('*')
                           .paginate(5,5)

        return users.toJSON()
    }

    async mdl_sessions({response}: HttpContextContract){
        const sessions = await Database
                               .from('mdl_sessions')
                               .select('*')
        return response.json({sessions})
    }

    async checkUserSession({response} : HttpContextContract){
        const session = await Database.rawQuery('select mdl_user.username ,FROM_UNIXTIME(mdl_sessions.timecreated)  , DATE_ADD(FROM_UNIXTIME(mdl_sessions.timecreated) , interval 2 hour) as active_until  from mdl_sessions inner join mdl_user on mdl_user.id = mdl_sessions.userid;')
        return response.json({session})
    }
}
