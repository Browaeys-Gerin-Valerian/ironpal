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
('Epaules');

-- Insérer des données dans la table "exercise"
INSERT INTO "exercise" (name, description) VALUES
('Développé couché à la barre', 'Allongé sur un banc, les pieds bien calés au sol, le bas du dos légèrement cambré, les mains espacées d’une largeur supérieure à celle des épaules, il s’agit de pousser la barre après que celle-ci soit arrivée au contact de vos pectoraux.Il est bon de noter que comme lors de tous les exercises pour les pectoraux, votre cage thoracique doit être “sortie”. Vous ne devez à aucun moment vous retrouver à plat.'),
('Squat avec barre derrière la nuque', 'Debout, l’écartement des pieds environ égal à la largeur du bassin, le dos droit ou légèrement cambré, la barre placée sur les trapèzes, il s’agit d’effectuer une flexion des genoux. Pour les séries légères, on inspire pendant le premier quart de la descente, on bloque la respiration durant le reste de celle-ci et le premier quart de la montée et on expire pendant le reste de celle-ci. Pour les séries lourdes, on inspire en haut et on bloque la respiration pendant toute la descente. On parle de squat complet (full squat) quand les ischio-jambiers entrent en contact avec les mollets et de squat à la parallèle (parallel squat) quand le fémur est parallèle au sol en bas du mouvement. Certains ont les cuisses tellement grosses que leur squat à la parallèle est aussi un squat complet ! Les haltérophiles et les pratiquants de force athlétique utilisent des chaussures spécifiques, à semelle rigide et talon assez épais, pour avoir un meilleur équilibre en position basse et éviter une déperdition d’énergie dans une semelle amortissante. Ne squattez pas pied nus : des chaussures sont indispensables pour prévenir un affaissement de la voûte plantaire consécutive à l’utilisation de charges lourdes. N’utilisez pas de chaussures avec semelle à air : elles risquent d’exploser lors de l’utilisation de charges lourdes. Les haltérophiles se passent de la ceinture de force au squat mais la majorité des pratiquants de force athlétique l’utilise. Nous vous conseillons donc de l’utiliser.'),
('Deadlift', 'Debout, les pieds légèrement écartés d’une largeur inférieure à celles des épaules, les genoux fléchis, le dos droit ou légèrement cambré, la barre au sol, les mains écartées d’une largeur d’épaules en prise pronation ou prise inversée (une main en pronation, l’autre en supination), il s’agit de soulever la barre en tendant les jambes et en redressant le buste. Pour les séries légères (qui ont peu d’intérêt), on inspire pendant le premier quart de la montée, on bloque la respiration durant le reste de celle-ci et le premier quart de la descente ; et on expire pendant le reste de celle-ci. Pour les séries lourdes, on inspire en bas et on bloque la respiration pendant toute la montée. Le dos ne doit jamais s’arrondir, sinon vous risquez la hernie discale. La position de départ varie en fonction de votre morphologie : les hanches peuvent être plus ou moins hautes. Pour favoriser le travail des puissants muscles des hanches, le talon doit être le plus près du sol. À cet effet, vous pouvez utiliser des chaussures plates rigides ou des chaussons de gymnastique à fine semelle. La majorité des pratiquants de force athlétique utilisent la ceinture de force au soulevé de terre. Nous vous la conseillons car elle diminue les forces de cisaillement auxquelles est soumise la colonne vertébrale. Des jambes et bras longs et un buste court sont idéaux pour réaliser de grosses barres au soulevé de terre : l’amplitude de mouvement est réduite, la position de départ est mécaniquement plus favorable et le bras de levier est meilleur. Notons également qu’il convient de serrer les omoplates en fin de mouvement afin de contracter plus fortement les trapèzes moyens et inférieurs.'),
('Curl incliné', 'Assis sur un banc incliné à 45 degrés, le dos en contact avec le banc mais la tête relevée, les pieds bien calés au sol, il s’agit d’effectuer une flexion des coudes en retenant bien la descente. Il faut faire attention ne pas reculer les coudes pendant le mouvement mais plutôt à les avancer si l’exercise devient difficile. C’est une erreur que l’on peut faire lorsque l’on met trop lourd. Il convient aussi de ne pas tendre complètement les coudes en bas du mouvement afin de ne pas placer le biceps dans une position de “faiblesse” pouvant conduire à la blessure.'),
('Développé épaules avec haltères', 'Debout ou assis, le buste vertical et le dos droit ou légèrement cambré, une haltère dans chaque main en prise pronation, il s’agit de développer les haltères au-dessus de la tête (extension des bras à la verticale). L’inspiration se fait à la descente et l’expiration à la montée. Selon la souplesse de vos épaules, vous pouvez avoir intérêt à ne pas descendre les haltères plus bas que les oreilles, une fois la série amorcée.');

-- Insérer des données dans la table "exerciseMusculaire"
INSERT INTO "exerciseMuscleGroup" (exercise_id, muscle_group_id) VALUES
(1, 1), -- Développé couché à la barre cible le torse
(2, 3), -- Squat cible les jambes
(3, 2), -- Deadlift cible le dos
(4, 4), -- Curl incliné ciblent les biceps
(5, 5); -- Développé épaules avec haltères ciblent les épaules


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
