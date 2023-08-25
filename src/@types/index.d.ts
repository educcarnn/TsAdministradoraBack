
import { User } from '../interface/user'; // Certifique-se de importar corretamente a interface User

declare global {
    namespace Express {
        interface Request {
            user?: User; // Certifique-se de usar a tipagem correta da interface User
        }
    }
}

