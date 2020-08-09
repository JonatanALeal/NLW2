//Importando o db - os dados serão cadastrados pelo formulário
const Database = require('./db')
const createProffy = require('./createProffy.js')

Database.then(async (db) => {
    //Inserir dados - professores e aulas

    proffyValue = {
        name: "Mayk Brito",
        avatar: "https://avatars2.githubusercontent.com/u/6643122?s=460&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4",
        whatsapp: "48988899888",
        bio: "Instrutor Ead"
    }

    classValue = {
        subject: 1,
        cost: "200"
        //proffy id virá pelo banco de
    }

    //mais de um dado colocar dentro de array [] os objetos {}
    classScheduleValues = [
        //class_id virá pelo banco de dados, após cadastra a aula
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]

    // executar a função
    //await createProffy(db, {proffyValue,classValue, classScheduleValues})


    //Consultar dados inseridos

    // tods os proffys
    const selectedProffys = await db.all(`SELECT * FROM proffys`)
    //console.log(selectedProffys)

    //consultar as classes de um determinado professor e trazer junto os dados do professor - usar (``) na consulta com tiver mais linhas na consulta
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    //console.log(selectClassesAndProffys)

    // Horário cadastrado pelo professor 
    // time_from (8h) precisa ser menor ou igual ao horario solicitado pelo aluno
    // time_to precisa ser maior
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "520"

    `)
    console.log(selectClassesSchedules)
})