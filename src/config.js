const config = {
    "port": 8080,
    "bodyLimit": "2mb",
    "corsHeaders": ["http://127.0.0.1",'http://127.0.0.1:3000'],
    "secret": "hhgjh4142TY&_JH",
    "database": "mongodb://localhost:27017/lion",
    email_config: {
        'FROM': 'Fattoria Team <songokute@live.com>',
        "smtp_server": 'smtp-mail.outlook.com',
        "smtp_port": 587,
        "smtp_usernae": 'songokute@live.com',
        "smtp_pass": "Ptit@FPT!"
    }
}

export default config