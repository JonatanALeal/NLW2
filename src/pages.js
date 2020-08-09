const Database = require(`./database/db`)

//importando os dados do formulario
const { subjects, weekdays, getSubject, convertHoursToMinutes } = require(`./utils/format`)


//pagina inicial
function pageLanding(req,res) {
    return res.render("index.htm")
}

// pelo render o nunjucks envia lista de dados cadastrados na const proffys - cadstrar no study.htm -> main -> h1 {{proffys}}

//pagina de estudo
async function pageStudy(req,res) {
    // infos do filtro de horário console.log(req.query)
    // filtrar somente os dados respectivos cadastrados 
    const filters = req.body // filters é o botão filtro que envia e recebe a opção do user

    //condição para testar os filtros se estiver vazio
    if(!filters.subject || !filters.weekday || !filters.time){
        return res.render("study.htm", { filters , subjects, weekdays })
    }
}
    //console.log('Não tem campo vazios')

    //converter horas em minutos
    const timeToMinutes = convertHoursToMinutes(filters.time)

    // construir a consulta 
    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS(
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${filters.timeToMinutes}
            AND class_schedule.time_to > ${filters.timeToMinutes}
        )
        AND classes.subject = '${filters.subject}'
    `

    // IMPORTANTE ----------------------------------
    // Caso haja erro na fora da consulta do banco de dados
    try {
        const db =  Database
        const proffys =  db.all(query)

        proffys.map( (proffy) => {
            proffy.subject = getSubject(proffy.subject)

        })

        return res.render('study.htm', {proffys, subjects, filters, weekdays})

    } catch (error) {
        console.log(error)
    }

    return res.render("study.htm", { filters, subjects, weekdays }) //usando cost acima array proffys e title


//cadastro de novos professores
function pageGiveClasses(req,res) {
    
    return res.render("give-classes.htm", {subjects, weekdays})
}

async function saveClasses(req,res) {
    const createProffy = require('./database/createProffy')
   
    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map( (weekday,index) => {

        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])

        }
    })

    try { 
        const db = await Database
        await createProffy(db, {proffyValue, classValue, classScheduleValues})

        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]
       
         // IF VAZIO volta para pg study.htm
         return res.redirect("/study" + queryString)
    } catch (error) {
        console.log(error)
    }
   
    //const data = req.query //adicionar dados ao objeto const proffys - infos preenchidas no formulário "dar aulas"
    //console.log(data)
    
    /*const isNotEmpty = Object.keys(data).length > 0
    //criar um if se houver dados = data
    if (isNotEmpty) {
    //console.log('entrei aqui')

    // usando o get.subject enviando numero do array da matéria
       data.subject = getSubject(data.subject) 
    
    //gravando os data no objeto proffys esta em memoria precisa guardar em um banco de dados 
        proffys.push(data)
    }*/  
    
}

//exportando para server.js
module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}
    
