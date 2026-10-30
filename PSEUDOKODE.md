Houses endpoints:
GET /houses || Get all houses
1 MODTAG anmodning og hent alle 'houses'.
2 SEND SQL query ('SELECT * FROM houses') til databasen.
3 MODTAG resultater fra databasen.
4 Returner listen af 'houses' som JSON med status!

Dette er selvfølgelig samme princip for alle endpoints, såsom 'GET /teachers, students, courses'!

Teachers endpoints:
GET /teachers/:id || Get single teacher - For specifikt det ønskede id!!!
1 MODTAG anmodning og hent teachers, men specifikt for givet id!
    - Eksempelvis GET /teachers/1 - i stedet for der står ':id'
2 SEND SQL query ('SELECT * FROM houses WHERE id=$1') til databasen.
3 MODTAG resultater fra databasen.
4 Returner listen af 'houses' som JSON med status!

Students endpoints:
POST /students || POST new student! - For at add en ny student til databasen!!!
1 MODTAG anmodning med 'student_name, fk_house, student_year' i body
2 Tjek om 'student_name, fk_house, student_year'er angivet
    - Hvis tom returner med en fejlkode 400 ('studen_name, fk_house, student_year is required!')
3 SEND SQL query ('INSERT INTO students (student_name, fk_house, student_year) VALUES ($1, $2, $3) RETURNING *;') til databasen.
4 RETURNER den oprettede student (med alt info) som JSON med status 201

PUT /students/:id || PUT single student - Opdaterer specifikt student ud fra ønskede id!!!
1 MODTAG id fra URL-parametre ('req.params')
2 MODTAG 'student_name', 'fk_house' og 'student_year' fra body
3 TJEK om alle krævede felter er tilstede
    - Hvis noget mangler: RETURNER med fejlkode 400
4 SEND SQL query ('UPDATE students SET student_name = $1, fk_house = $2, student_year = $3 WHERE id = $4 RETURNING *;') til databasen
5 TJEK om student eksisterer
    - Hvis ikke! RETURNER fejlkode 404
6 RETURNER den opdaterede student som JSON med status 200

DEL /students/:id || DELETE single student - Fjerner specifikt student ud fra ønsket id!!!
1 MODTAG id fra URL-parametre ('req.params')
2 SEND SQL query ('DELETE FROM students WHERE id = $1 RETURNING *;') til databasen!
3 TJEK om rækken blev slettet!
    - Hvis student ikke blev fundet RETURNER med fejlkoden 404 ('Student not found')
4 RETURNER bekræftelse/student slettet med status 200

Courses
Currently w.i.p [work in progress]...