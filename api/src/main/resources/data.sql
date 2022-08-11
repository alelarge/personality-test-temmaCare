INSERT INTO TEST (ID, TITLE) VALUES (1, 'Are you an introvert or an extrovert?');

INSERT INTO QUESTION (ID, NUMBER, QUESTION_TEXT, TEST_ID)
VALUES
(1, 1, 'You’re really busy at work and a colleague is telling you their life story and personal woes. You:', 1),
(2, 2, 'You’ve been sitting in the doctor’s waiting room for more than 25 minutes. You:', 1);

INSERT INTO Response (ID, LETTER, RESPONSE_TEXT, QUESTION_ID)
VALUES
(1, 'A', 'Don’t dare to interrupt them', 1),
(2, 'B', 'Think it’s more important to give them some of your time; work can wait', 1),
(3, 'C', 'Listen, but with only with half an ear', 1),
(4, 'D', 'Interrupt and explain that you are really busy at the moment', 1),
(5, 'A', 'Look at your watch every two minutes', 2),
(6, 'B', 'Bubble with inner anger, but keep quiet', 2),
(7, 'C', 'Explain to other equally impatient people in the room that the doctor is always running late', 2),
(8, 'D', 'Complain in a loud voice, while tapping your foot impatiently', 2);
