import auth from './AuthManager';
import role from './RoleManager';
import user from './UserManager';
import client from './ClientManager';
import smartfarm from './smartFarm/SmartFarmManager'
const manager = {
  auth: auth,
  role: role,
  user: user,
  client: client,
  smartfarm : smartfarm
}
export default manager