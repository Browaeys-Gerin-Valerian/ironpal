-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "firstname" VARCHAR NOT NULL,
    "lastname" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "birthdate" VARCHAR,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "session_date" TIMESTAMP(3) NOT NULL,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER NOT NULL,
    "muscle_group_id" INTEGER,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessionExercise" (
    "id" SERIAL NOT NULL,
    "load" DECIMAL(65,30) NOT NULL,
    "rest_between_exercises" INTEGER NOT NULL,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "comment" VARCHAR,
    "session_id" INTEGER NOT NULL,
    "exercise_id" INTEGER NOT NULL,

    CONSTRAINT "sessionExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "set" (
    "id" SERIAL NOT NULL,
    "number_of_repetitions" INTEGER NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "rest_between_sets" INTEGER NOT NULL,
    "session_exercise_id" INTEGER NOT NULL,

    CONSTRAINT "set_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercise" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR,

    CONSTRAINT "exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exerciseMuscleGroup" (
    "id" SERIAL NOT NULL,
    "exercise_id" INTEGER NOT NULL,
    "muscle_group_id" INTEGER NOT NULL,

    CONSTRAINT "exerciseMuscleGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "muscleGroup" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "muscleGroup_pkey" PRIMARY KEY ("id")
);



-- Insérer des données dans la table "Utilisateur"
INSERT INTO "user" (firstname, lastname, email, password, birthdate) VALUES
('Jean', 'Dupont', 'jean.dupont@exemple.fr', 'motDePasse123', '1985-10-28'),
('Marie', 'Martin', 'marie.martin@exemple.fr', 'motDePasse456', '1998-08-12'),
('Pierre', 'Lefebvre', 'pierre.lefebvre@exemple.fr', 'motDePasse789', '1999-01-10');

-- Insérer des données dans la table "GroupeMusculaire"
INSERT INTO "muscleGroup" (name) VALUES
('Pectoraux'),
('Dos'),
('Jambes'),
('Biceps'),
('Triceps'),
('Trapezes'),
('Epaules'),


-- Insérer des données dans la table "exercise"
INSERT INTO "exercise" (name, description) VALUES

-- Exercices pour le haut du corps
('Développé couché avec haltères', 'Allongé sur un banc, poussez les haltères vers le haut en ciblant les pectoraux et les triceps.'),
('Développé incliné avec haltères', 'En position inclinée sur un banc, soulevez les haltères pour travailler les pectoraux supérieurs.'),
('Écarté couché avec haltères', 'Allongé, ouvrez et fermez les bras pour muscler les pectoraux.'),
('Pull-over avec haltère', 'Étirez les pectoraux et le dos en soulevant un haltère au-dessus de votre tête.'),
('Développé militaire avec barre', 'Debout ou assis, poussez une barre au-dessus de votre tête pour renforcer les épaules et les triceps.'),
('Développé épaules avec haltères', 'Soulevez des haltères au-dessus de la tête pour cibler les deltoïdes.'),
('Élévations latérales avec haltères', 'Levez les haltères sur les côtés pour muscler les deltoïdes latéraux.'),
('Élévations frontales avec haltères', 'Soulevez les haltères devant vous pour cibler les épaules antérieures.'),
('Oiseau en suspension', 'Tenez une position de gainage avec une jambe et un bras levés.'),
('Rowing avec haltères', 'En position inclinée, tirez les haltères vers votre abdomen pour travailler les dorsaux.'),
('Rowing avec barre', 'Avec une barre, effectuez un tirage incliné pour renforcer le dos et les biceps.'),
('Tractions avec prise large', 'Travaillent les dorsaux en élargissant la prise sur la barre.'),
('Tractions avec prise serrée', 'Concentrez l’effort sur les biceps et le bas du dos.'),
('Dips sur barre parallèle', 'Ciblez les triceps, les pectoraux et les épaules en poussant votre corps entre deux barres.'),
('Dips avec poids', 'Ajoutez une charge pour augmenter l’intensité des dips.'),
('Extension triceps avec haltère au-dessus de la tête', 'Renforcez les triceps en étirant et en poussant un haltère derrière la tête.'),
('Kickback pour les triceps', 'Étendez les bras vers l’arrière pour isoler les triceps.'),
('Shrugs avec haltères', 'Haussez les épaules avec des haltères pour renforcer les trapèzes.'),
('Face pull avec câble', 'Tirez un câble vers votre visage pour muscler le haut du dos et les épaules.'),
('Barre au front avec haltères', 'Travaillez les triceps en pliant et en étendant les coudes au-dessus du front.'),
('Tractions en supination', 'Concentrez l’effort sur les biceps.'),

-- Exercices pour le bas du corps
('Squat avec haltères', 'Fléchissez les genoux en tenant des haltères pour muscler les jambes et les fessiers.'),
('Squat avant avec barre', 'Placez la barre sur l’avant des épaules pour renforcer les quadriceps.'),
('Fentes avec haltères', 'Avancez une jambe en tenant des haltères pour cibler les fessiers et les quadriceps.'),
('Soulevé de terre jambes tendues', 'Travaillez les ischio-jambiers en abaissant une barre avec les jambes droites.'),
('Hip thrust avec barre', 'Allongé, poussez une barre vers le haut avec les hanches pour muscler les fessiers.'),
('Presse à jambes', 'Appuyez sur une plateforme pour travailler l’ensemble des jambes.'),
('Good mornings avec barre', 'Inclinez le torse avec une barre pour renforcer les ischio-jambiers et les lombaires.'),
('Step-up avec haltères', 'Montez sur un banc avec des haltères pour cibler les quadriceps et les fessiers.'),
('Extensions des jambes à la machine', 'Isoler les quadriceps en poussant une barre avec vos jambes.'),
('Curl des jambes allongé', 'Travaillez les ischio-jambiers en pliant les jambes sur une machine.'),
('Mollets debout sur une marche', 'Haussez les talons pour muscler les mollets.'),
('Mollets assis sur machine', 'Similaire mais en position assise pour isoler les mollets.'),
('Hack squat', 'Faites des squats guidés sur une machine pour varier la sollicitation musculaire.'),
('Sumo squat avec haltères', 'Tenez un haltère entre vos jambes en position large pour muscler les adducteurs.'),

-- Exercices pour le corps (abdominaux et gainage)
('Crunch classique', 'Contractez les abdominaux en enroulant le haut du corps.'),
('Crunch avec rotation', 'Ajoutez une rotation pour solliciter les obliques.'),
('Crunch avec poids', 'Intensifiez l’effort en tenant un poids sur votre poitrine.'),
('Relevés de jambes suspendus', 'Soulevez les jambes en suspension pour muscler les abdominaux inférieurs.'),
('Relevés de jambes allongé', 'Soulevez les jambes en position couchée pour cibler le bas des abdominaux.'),
('Planche classique', 'Maintenez une position statique pour renforcer le gainage.'),
('Planche latérale', 'Travaillez les obliques en tenant une position de côté.'),
('Russian twist avec haltère', 'Tournez le torse en tenant un haltère pour renforcer les obliques.'),
('Ab wheel rollouts', 'Roulez une roue pour étirer et renforcer les abdominaux.'),
('Hollow hold', 'Tenez une position en "U" pour travailler tout le core.'),

-- Exercices pour le cardio et la mobilité
('Burpees', 'Enchaînez sauts, pompes et positions accroupies pour un effort cardio intense.'),
('Kettlebell swings', 'Balancez une kettlebell pour travailler le cardio et les hanches.'),
('Battle rope', 'Agitez des cordes lourdes pour un exercice dynamique.'),
('Saut à la corde', 'Travaillez l’endurance et la coordination.'),
('Rowing machine', 'Simulez l’aviron pour un entraînement cardio complet.'),
('Vélo stationnaire', 'Pédalez pour renforcer le bas du corps et améliorer l’endurance.'),
('Tapis de course avec sprints', 'Alternez entre courses rapides et marche pour un effort fractionné.'),
('Marche avec haltères', 'Transportez des haltères pour améliorer votre endurance musculaire.'),
('Travail de sprint en escaliers', 'Courez sur des escaliers pour un entraînement explosif.'),
('Pliométrie avec box jumps', 'Sautez sur une plateforme pour développer la puissance.'),


-- Insérer des données dans la table "exerciseMusculaire"
INSERT INTO "exerciseMuscleGroup" (exercise_id, muscle_group_id) VALUES



-- Insert data into "session" table
INSERT INTO "session" (title, session_date, validated, user_id, muscle_group_id) VALUES
('Entraînement pectoraux', '2023-10-01 08:00:00', true, 1, 1),
('session jambes', '2023-10-02 09:30:00', false, 2, 3),
('session Dos', '2023-10-03 18:00:00', true, 3, 2);


-- Insert data into "sessionExercise" table
INSERT INTO "sessionExercise" (load, rest_between_exercises, validated, comment, session_id, exercise_id) VALUES
(80, 180, true,'Mettre des coudieres', 1, 1), -- Développé couché à la barre dans l'entraînement pectoraux
(150, 300, true,'Pieds legerement levés', 2, 2), -- Squat dans la session de jambes
(200, 240, true,'Mettre une ceinture de force', 3, 3); -- Deadlift dans la session Dos

-- Insert data into "set" table
INSERT INTO "set" (number_of_repetitions, difficulty, rest_between_sets, session_exercise_id) VALUES
(12, 2, 120, 1),(12, 2, 120, 1),(11, 3, 120, 1),(10, 4, 120, 1), -- set pour Développé couché à la barre dans l'entraînement pectoraux
(10, 3, 180, 2),(10, 4, 180, 2),(9, 4, 180, 2),(7, 5, 180, 2), -- set pour le squat dans la session de jambes
(5, 4, 180, 3),(5, 4, 180, 3),(5, 4, 180, 3); -- set pour le Deadlift  dans la session Dos
