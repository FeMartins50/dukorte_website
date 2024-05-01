import { registerUser, isNameAndSquadAvailable, isEmailAvailable, deletePendingEmail } from "$lib/server/login.js";
import { registerUUID, deleteUUIDsByEmail } from "$lib/server/validation.js";
import { redirect } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import { GMAIL_APP_PASSWORD } from '$env/static/private';

export const load = async ({ locals }) => {
    // redirect user if logged in
    if (locals.user) {
        redirect(302, '/')
    }
}

export const actions = {
    register: async ({ request, url }) => {
        const data = await request.formData();
        const email = data.get('email').trim();
        const password = data.get('password').trim();
        const oauth = "Pending"; // Pending verification
        const nome = data.get('nome').toUpperCase().trim();
        const turma = data.get('turma');
        // Verify if name is available
        if (await isNameAndSquadAvailable(nome, turma) < 0) {
            return { status: -3 }; // Acess through 'form' prop -> form?.status
        }
        // Verify if email is available
        if (await isEmailAvailable(email) < 0) {
            return { status: -2 }; // Acess through 'form' prop -> form?.status
        }
        // Try to register
        console.log("=DUKORTE= Tentei registrar usuário "+ email +" == ");
        let registered = await registerUser(email, password, oauth, nome, turma);
        console.log((registered > 0 ? "deu bom" : "deu ruim"));

        // VALIDATION
        const verifyUUID = crypto.randomUUID();
        const ttl = 10*60*1000;
        const timeout = new Date().getTime() + ttl;
        const validationLink = `${url.origin}/register/verify=${verifyUUID}`;

        registerUUID(verifyUUID, email, 0, timeout);
        sendEmail(email, "Du Korte - Confirmação de E-mail", 
            `Prezado ${nome},\n\n Clique no link a seguir para verificar seu e-mail. A verificação é automática, e você será redirecionado para a página de login diretamente.\n O link expira em ${ttl/60/1000} minutos.\n ${validationLink}`
        );
        setTimeout(() => {
            deleteUUIDsByEmail(email);
            deletePendingEmail(email);
        } , ttl);
        redirect(302, `/register/email=${email}`);

        return { status: registered };
    }
}

const gmailpass = GMAIL_APP_PASSWORD.replaceAll("-", " ");
async function sendEmail(recipients, emailSubject, emailBody) {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "nicholas50felix@gmail.com",
                pass: gmailpass,
            },
        });

        const mailOptions = {
            from: '"De Lima DU KORTE" nicholas50felix@gmail.com',
            to: recipients,
            subject: emailSubject,
            text: emailBody
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
    } catch (error) {
        console.error('Error occurred:', error);
    }
}