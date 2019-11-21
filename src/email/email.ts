export abstract class Email{
    subject: string;
    text: string;
    html: string;
    from: string;
    to: string[];

    constructor(){
        this.from = '"Webmaster Spirit-lan" <webmaster@spirit-lan.com>'
    }
}