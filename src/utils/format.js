// criando variavel para pegar dados de array inserido pelo user no form horario e mantendo na tela através do loop if para para cada Selected
//dados das matérias
const subjects = [
    "Artes",
    "Biologia",
    "Ciência",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

//dados dias da semana
const weekdays = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado"
]

// criando variável para usar no render junto ao array proffys que esta cadastrada no main do study.htm
//const title = "Hi nunjucks"

// Template engine layout via motor - NUNJUCKS
//-----------------------------------------------------------
// reorganizar as funções .get
//alterando return res.sendFile(__dirname + rota"/views/index.htm") para renderizar utilizando nunjucks indicando arquivo

//Funcionalidade

//pegar uma aula passa os dados por numero do array e recebe a matéria respectiva
function getSubject(subjectNumber) {
    const arrayPosition = +subjectNumber - 1
    return subjects[arrayPosition]
}

//convertendo horas em minutos
function convertHoursToMinutes(time){
    const [hour, minutes] = time.split(":")
    //funcionalidade Number para garantir resposta numérica
    return Number((hour * 60) + minutes)
    
}


module.exports = {
        subjects,
        weekdays,
        getSubject

}