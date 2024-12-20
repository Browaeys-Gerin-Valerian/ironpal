-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "firstname" VARCHAR NOT NULL,
    "lastname" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "birthdate" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "session_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessionExercise" (
    "id" SERIAL NOT NULL,
    "load" DECIMAL(65,30) NOT NULL,
    "rest_between_exercises" INTEGER NOT NULL,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "session_id" INTEGER NOT NULL,
    "exercise_id" INTEGER NOT NULL,

    CONSTRAINT "sessionExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "set" (
    "id" SERIAL NOT NULL,
    "number_of_repetitions" INTEGER NOT NULL,
    "difficulty" INTEGER NOT NULL DEFAULT 1,
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

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessionExercise" ADD CONSTRAINT "sessionExercise_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessionExercise" ADD CONSTRAINT "sessionExercise_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "set" ADD CONSTRAINT "set_session_exercise_id_fkey" FOREIGN KEY ("session_exercise_id") REFERENCES "sessionExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exerciseMuscleGroup" ADD CONSTRAINT "exerciseMuscleGroup_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exerciseMuscleGroup" ADD CONSTRAINT "exerciseMuscleGroup_muscle_group_id_fkey" FOREIGN KEY ("muscle_group_id") REFERENCES "muscleGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;



-- Insérer des données dans la table "Utilisateur"
INSERT INTO "user" (firstname, lastname, email, password, birthdate, created_at, updated_at) VALUES
('Jean', 'Dupont', 'jean.dupont@exemple.fr', 'motDePasse123', NOW(), NOW(), NOW()),
('Marie', 'Martin', 'marie.martin@exemple.fr', 'motDePasse456', NOW(), NOW(), NOW()),
('Pierre', 'Lefebvre', 'pierre.lefebvre@exemple.fr', 'motDePasse789', NOW(), NOW(), NOW());

-- Insérer des données dans la table "GroupeMusculaire"
INSERT INTO "muscleGroup" (name) VALUES
('Trapezes'),
('Epaules'),
('Pectoraux'),
('Biceps'),
('Triceps'),
('Dos'),
('Fessiers'),
('Quadriceps'),
('Ischio-jambiers'),
('Mollet'),
('Abdominaux');


-- Insérer des données dans la table "exercise"
INSERT INTO "exercise" (name, description) VALUES

-- Trapèze - 1
('Shrugs avec haltères', 'Tenez un haltère dans chaque main, bras le long du corps. Haussez les épaules aussi haut que possible, maintenez la contraction un instant, puis relâchez lentement.'),

-- Épaules - 2
('Développé épaules avec haltères', 'Tenez un haltère dans chaque main à hauteur d’épaule, paumes vers l’avant. Poussez les haltères au-dessus de votre tête jusqu’à extension complète des bras, puis redescendez lentement.'),
('Élévations latérales avec haltères', 'Tenez un haltère dans chaque main, bras le long du corps. Levez les bras sur les côtés jusqu’à ce qu’ils soient parallèles au sol, puis redescendez lentement.'),
('Élévations frontales avec haltères', 'Tenez un haltère dans chaque main devant vos cuisses. Levez les bras devant vous jusqu’à la hauteur des épaules, puis redescendez lentement.'),
('Oiseau avec haltères', 'Penchez le buste vers l’avant, haltères dans les mains, bras légèrement fléchis. Ouvrez les bras vers l’extérieur jusqu’à la hauteur des épaules, puis ramenez-les lentement.'),
('Développé militaire avec barre', 'Debout ou assis, tenez une barre à hauteur de clavicule. Poussez la barre au-dessus de votre tête jusqu’à extension complète des bras, puis redescendez lentement.'),

-- Pectoraux - 3
('Développé couché avec haltères', 'Allongez-vous sur un banc, les pieds fermement posés au sol. Descendez lentement les haltères de chaque côté, puis poussez-les vers le haut pour revenir à la position initiale.'),
('Développé incliné avec haltères', 'Asseyez-vous sur un banc incliné (30-45°), les haltères en main. Tendez les bras vers le haut, puis descendez lentement les haltères vers les côtés avant de les remonter.'),
('Écarté couché avec haltères', 'Allongez-vous sur un banc, bras légèrement pliés. Écartez les haltères vers les côtés jusqu’à ressentir un étirement au niveau des pectoraux, puis ramenez-les au-dessus de la poitrine.'),
('Pull-over avec haltère', 'Tenez un haltère à deux mains. Allongé sur un banc, amenez l’haltère derrière la tête en gardant les bras tendus, puis revenez à la position initiale.'),

-- Biceps - 4
('Tractions en supination', 'Accrochez-vous à une barre, paumes face à vous. Tirez-vous jusqu’à ce que votre menton dépasse la barre, en concentrant l’effort sur les biceps.'),
('Curl biceps avec haltères', 'Tenez un haltère dans chaque main, paumes vers l’avant. Pliez les bras pour amener les haltères vers les épaules, puis redescendez lentement.'),
('Curl marteau', 'Tenez un haltère dans chaque main, paumes face à face. Fléchissez les bras pour amener les haltères vers vos épaules.'),
('Curl concentration', 'Assis sur un banc, penchez légèrement le buste. Appuyez le coude d’un bras sur votre cuisse, puis soulevez un haltère en isolant le biceps.'),
('Curl biceps à la barre', 'Tenez une barre droite ou EZ avec une prise en supination. Pliez les bras pour soulever la barre, puis redescendez lentement.'),
('Curl Zottman', 'Effectuez un curl classique en supination. Une fois en haut, tournez les poignets en pronation et redescendez lentement.'),
('Curl au pupitre', 'Placez vos bras sur un pupitre incliné. Soulevez une barre ou un haltère en contractant les biceps, puis redescendez lentement.'),
('Tractions australiennes en supination', 'Accrochez-vous à une barre basse, pieds au sol. Avec les paumes vers vous, tirez votre poitrine vers la barre en contractant les biceps.'),

-- Triceps - 5
('Dips prise serrée', 'Appuyez-vous entre deux barres parallèles. Descendez en pliant les coudes, puis poussez pour revenir à la position initiale.'),
('Extension triceps avec haltère au-dessus de la tête', 'Tenez un haltère à deux mains au-dessus de votre tête. Descendez lentement l’haltère derrière votre tête, puis remontez en tendant les bras.'),
('Kickback pour les triceps', 'Penchez le buste en avant, haltères dans les mains. Tendez les bras vers l’arrière en gardant les coudes proches du corps.'),
('Barre au front avec haltères', 'Allongé sur un banc, tenez deux haltères. Descendez-les lentement vers votre front, puis poussez-les pour revenir à la position initiale.'),

-- Dos - 6
('Rowing avec haltères', 'Penchez le buste en avant, haltères dans les mains. Tirez les haltères vers votre abdomen en gardant les coudes près du corps, puis redescendez.'),
('Rowing avec barre', 'Avec une barre, fléchissez les genoux et penchez légèrement le buste. Tirez la barre vers votre abdomen, puis redescendez.'),
('Tractions en prise large pronation', 'Accrochez-vous à une barre avec une prise large. Tirez-vous jusqu’à ce que votre menton dépasse la barre, en sollicitant les dorsaux.'),

-- Fessiers - 7
('Hip thrust avec barre', 'Allongé sur un banc, placez une barre sur vos hanches. Poussez les hanches vers le haut pour contracter les fessiers, puis redescendez.'),
('Fentes avec haltères', 'Avancez une jambe tout en tenant des haltères. Fléchissez les genoux jusqu’à ce que le genou arrière touche presque le sol, puis revenez à la position initiale.'),
('Squat avec haltères', 'Tenez des haltères le long du corps. Fléchissez les genoux en gardant le dos droit, puis remontez.'),

-- Quadriceps - 8
('Squat avant avec barre', 'Placez la barre sur l’avant de vos épaules, coudes relevés. Descendez en fléchissant les genoux, puis poussez pour revenir à la position initiale.'),
('Extensions des jambes à la machine', 'Asseyez-vous sur une machine d’extension des jambes. Poussez la barre avec vos jambes jusqu’à extension complète, puis redescendez.'),

-- Ischios jambiers - 9
('Curl des jambes allongé', 'Allongez-vous sur une machine de leg curl. Poussez vos jambes contre le coussin jusqu’à ce qu’elles soient pliées, puis redescendez.'),
('Soulevé de terre jambes tendues', 'Avec une barre, penchez-vous en avant en gardant les jambes tendues. Revenez à la position initiale en contractant les ischio-jambiers.'),

-- Mollets - 10
('Mollets debout sur une marche', 'Placez l’avant de vos pieds sur une marche. Haussez les talons aussi haut que possible, puis redescendez lentement.'),
('Mollets assis sur machine', 'Asseyez-vous sur une machine de calf raise. Poussez avec vos orteils pour soulever le poids, puis redescendez lentement.'),

-- Abdominaux / Renforcement - 11
('Crunch classique', 'Allongez-vous sur le dos, genoux pliés. Contractez les abdominaux pour soulever le haut du corps, puis redescendez.'),
('Crunch avec rotation', 'Effectuez un crunch classique en ajoutant une rotation pour solliciter les obliques.'),
('Crunch avec poids', 'Tenez un poids contre votre poitrine. Contractez les abdominaux pour soulever le haut du corps, puis redescendez.'),
('Relevés de jambes suspendus', 'Accrochez-vous à une barre de traction. Soulevez les jambes jusqu’à ce qu’elles soient parallèles au sol, puis redescendez.'),
('Relevés de jambes allongé', 'Allongez-vous sur le dos. Soulevez vos jambes tendues jusqu’à 90°, puis redescendez lentement.'),
('Planche classique', 'Maintenez une position de gainage en appui sur les avant-bras et les pieds. Gardez le dos droit.'),
('Planche latérale', 'Allongez-vous sur le côté, en appui sur un avant-bras. Maintenez la position en gardant le corps aligné.');





-- Insérer des données dans la table "exerciseMusculaire"
INSERT INTO "exerciseMuscleGroup" (exercise_id, muscle_group_id) VALUES
-- Trapèze - 1
(1, 1),

-- Épaules - 2
(2, 2),
(3, 2),
(4, 2),
(5, 2),
(6, 2),

-- Pectoraux - 3
(7, 3),
(8, 3),
(9, 3),
(10, 3),

-- Biceps - 4
(11, 4),
(12, 4),
(13, 4),
(14, 4),
(15, 4),
(16, 4),
(17, 4),
(18, 4),

-- Triceps - 5
(19, 5),
(20, 5),
(21, 5),
(22, 5),

-- Dos - 6
(23, 6),
(24, 6),
(25, 6),

-- Fessiers - 7
(26, 7),
(27, 7),
(28, 7),

-- Quadriceps - 8
(29, 8),
(30, 8),

-- Ischios jambiers - 9
(31, 9),
(32, 9),

-- Mollets - 10
(33, 10),
(34,10),

-- Abdominaux - 11
(35,11),
(36,11),
(37,11),
(38,11),
(39,11),
(40,11),
(41,11);








-- Insert data into "session" table
INSERT INTO "session" (title, session_date, created_at, updated_at, user_id) VALUES
('Entraînement pectoraux', '2023-10-01 08:00:00', NOW(), NOW(), 1),
('session jambes', '2023-10-02 09:30:00', NOW(), NOW(), 2),
('session Dos', '2023-10-03 18:00:00', NOW(), NOW(), 3);


-- Insert data into "sessionExercise" table
INSERT INTO "sessionExercise" (load, rest_between_exercises, validated, comment, created_at, updated_at, session_id, exercise_id) VALUES
(80, 180, true,'Mettre des coudieres', NOW(), NOW(), 1, 1), -- Développé couché à la barre dans l'entraînement pectoraux
(150, 300, true,'Pieds legerement levés', NOW(), NOW(), 2, 2), -- Squat dans la session de jambes
(200, 240, true,'Mettre une ceinture de force', NOW(), NOW(), 3, 3); -- Deadlift dans la session Dos

-- Insert data into "set" table
INSERT INTO "set" (number_of_repetitions, difficulty, rest_between_sets, session_exercise_id) VALUES
(12, 2, 120, 1),(12, 2, 120, 1),(11, 3, 120, 1),(10, 4, 120, 1), -- set pour Développé couché à la barre dans l'entraînement pectoraux
(10, 3, 180, 2),(10, 4, 180, 2),(9, 4, 180, 2),(7, 5, 180, 2), -- set pour le squat dans la session de jambes
(5, 4, 180, 3),(5, 4, 180, 3),(5, 4, 180, 3); -- set pour le Deadlift  dans la session Dos
