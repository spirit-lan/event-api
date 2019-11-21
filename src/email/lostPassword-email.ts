import { Email } from "./email"

class LostPasswordEmail extends Email{
    constructor(){
        super()
        this.subject = "Récupération de mot de passe - SPIRIT-LAN"
        this.text = 'Bonjour, veuillez suivre le lien ci-dessous pour en saisir un nouveau : ICI LE LIEN'
        this.html = 'Bonjour,<br/> Veuillez suivre le lien ci-dessous pour en saisir un nouveau :<br/> ICI LE LIEN'
    }
}

export default new LostPasswordEmail();