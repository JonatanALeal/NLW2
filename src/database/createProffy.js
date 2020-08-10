// recebimento de dados - exportando por uma função
module.exports = async function(db, { proffyValue, classValue, classScheduleValues }) {
    //lógica para inserir dados na tabela teachers - colocar async antes da function para trabalhar com await - usar crase (` `) - template literos no JS

    //db.run().then() substitui 
    //importando os dados do formulário "objeto - proffyValue" através do values ${}
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)

    const proffy_id = insertedProffy.lastID

    // inserir dados na tabela classes

    const insertedClass = await db.run(`
        INSERT INTO classes (
            subject,
            cost,
            proffy_id
        ) VALUES (
            "${classValue.subject}",
            "${classValue.cost}",
            "${proffy_id}"
        );
    `)

    const class_id = insertedClass.lastID
    
    // inserir dados na tabela class_schedule - vai precisar de loop - map == forEach - return terá um novo array através do map

    const insertedAllclassesScheduleValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"

            );
        `) 
    })

    // aqui vai executar todos db.runs() das class_schedules - através da promessa usando a coleção de dados registradas pelo user 
    await Promise.all(insertedAllclassesScheduleValues)
}