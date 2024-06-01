-- Inserts para la tabla usuarios
/*
INSERT INTO `pruebas`.`usuarios` (`nombre`, `apellido`, `email`, `password`) VALUES ('Juan', 'Pérez', 'juan@example.com', 'password1');
INSERT INTO `pruebas`.`usuarios` (`nombre`, `apellido`, `email`, `password`) VALUES ('María', 'González', 'maria@example.com', 'password2');
INSERT INTO `pruebas`.`usuarios` (`nombre`, `apellido`, `email`, `password`) VALUES ('Pedro', 'Rodríguez', 'pedro@example.com', 'password3');
INSERT INTO `pruebas`.`usuarios` (`nombre`, `apellido`, `email`, `password`) VALUES ('Ana', 'Martínez', 'ana@example.com', 'password4');
INSERT INTO `pruebas`.`usuarios` (`nombre`, `apellido`, `email`, `password`) VALUES ('Luis', 'Hernández', 'luis@example.com', 'password5');
INSERT INTO `pruebas`.`usuarios` (`nombre`, `apellido`, `email`, `password`) VALUES ('Laura', 'López', 'laura@example.com', 'password6');
INSERT INTO `pruebas`.`usuarios` (`nombre`, `apellido`, `email`, `password`) VALUES ('Carlos', 'Díaz', 'carlos@example.com', 'password7');
INSERT INTO `pruebas`.`usuarios` (`nombre`, `apellido`, `email`, `password`) VALUES ('Sofía', 'Torres', 'sofia@example.com', 'password8');
INSERT INTO `pruebas`.`usuarios` (`nombre`, `apellido`, `email`, `password`) VALUES ('Javier', 'Ruiz', 'javier@example.com', 'password9');
INSERT INTO `pruebas`.`usuarios` (`nombre`, `apellido`, `email`, `password`) VALUES ('Marta', 'Sánchez', 'marta@example.com', 'password10');
*/
-- Inserts para la tabla usuarios (con contraseñas hasheadas)
INSERT INTO `pruebas`.`usuarios` (`nombre`, `apellido`, `email`, `password`)
VALUES ('Juan', 'Pérez', 'juan@example.com', '$2b$10$Oai4kfTBe4LG2zOzTc5SoOgx9f3SLZi.qUbLTxFQUpPQfe5DDV4Y2');

INSERT INTO `pruebas`.`usuarios` (`nombre`, `apellido`, `email`, `password`)
VALUES ('María', 'González', 'maria@example.com', '$2b$10$NVtV/q/8.DrJtDfVOLsEUePdKt3aY4y4KFpEtW2i7tRuAwlqxQX9.');

INSERT INTO `pruebas`.`usuarios` (`nombre`, `apellido`, `email`, `password`)
VALUES ('Pedro', 'Rodríguez', 'pedro@example.com', '$2b$10$ucuwr02h0eSJTJTE22IbNOGc64uQEDgAiE8sWWMbB7btv81k3g/Oq');

INSERT INTO `pruebas`.`usuarios` (`nombre`, `apellido`, `email`, `password`)
VALUES ('Ana', 'Martínez', 'ana@example.com', '$2b$10$Bd5wO/KGOq1N1qA9ng/YFOThPy52bKS1JV95kUxH.1bD/0dmnmJ8u');

INSERT INTO `pruebas`.`usuarios` (`nombre`, `apellido`, `email`, `password`)
VALUES ('Luis', 'Hernández', 'luis@example.com', '$2b$10$lRxapwG0e4XQ7F23KhhKNePSd2z9GLYv5uxjnbyRUCJpUCFOPfR3i');

INSERT INTO `pruebas`.`usuarios` (`nombre`, `apellido`, `email`, `password`)
VALUES ('Laura', 'López', 'laura@example.com', '$2b$10$bTWRhO6gu5GiuEcQEeolp.JXmAUGSEq1azZCN3dKyQc.QjWbxQk8e');

INSERT INTO `pruebas`.`usuarios` (`nombre`, `apellido`, `email`, `password`)
VALUES ('Carlos', 'Díaz', 'carlos@example.com', '$2b$10$XOPyoHpd7zZRTPDg61vHZuMc7gRmM39x1qnUU3w/vlUwSuRPGNDNi');

INSERT INTO `pruebas`.`usuarios` (`nombre`, `apellido`, `email`, `password`)
VALUES ('Sofía', 'Torres', 'sofia@example.com', '$2b$10$hzjQFnp2U/xwXV2sOXzGcupwLa7ZK7oNzW7GTyDz7iM1Yjikh1GIS');

INSERT INTO `pruebas`.`usuarios` (`nombre`, `apellido`, `email`, `password`)
VALUES ('Javier', 'Ruiz', 'javier@example.com', '$2b$10$LjPBhR5o8DLFYnC59VIsYeGOTx6g/l/6/hTXPzFd9baK7iC3FJfLm');

INSERT INTO `pruebas`.`usuarios` (`nombre`, `apellido`, `email`, `password`)
VALUES ('Marta', 'Sánchez', 'marta@example.com', '$2b$10$Jn3ZIR3R6DmkyhAUFpumreh7Uu8UZLHJnKuyeFDlzQPWFxPdV5PKi');
-- Inserts para la tabla tarjetas
INSERT INTO `pruebas`.`tarjetas` (`numero_tarjeta`, `fecha_vencimiento`, `cvv`, `id_usuario`) VALUES ('1234567890123456', '2025-12-31', 123, 1);
INSERT INTO `pruebas`.`tarjetas` (`numero_tarjeta`, `fecha_vencimiento`, `cvv`, `id_usuario`) VALUES ('2345678901234567', '2026-06-30', 234, 2);
INSERT INTO `pruebas`.`tarjetas` (`numero_tarjeta`, `fecha_vencimiento`, `cvv`, `id_usuario`) VALUES ('3456789012345678', '2024-09-30', 345, 3);
INSERT INTO `pruebas`.`tarjetas` (`numero_tarjeta`, `fecha_vencimiento`, `cvv`, `id_usuario`) VALUES ('4567890123456789', '2027-03-31', 456, 4);
INSERT INTO `pruebas`.`tarjetas` (`numero_tarjeta`, `fecha_vencimiento`, `cvv`, `id_usuario`) VALUES ('5678901234567890', '2025-11-30', 567, 5);
INSERT INTO `pruebas`.`tarjetas` (`numero_tarjeta`, `fecha_vencimiento`, `cvv`, `id_usuario`) VALUES ('6789012345678901', '2026-08-31', 678, 6);
INSERT INTO `pruebas`.`tarjetas` (`numero_tarjeta`, `fecha_vencimiento`, `cvv`, `id_usuario`) VALUES ('7890123456789012', '2024-07-31', 789, 7);
INSERT INTO `pruebas`.`tarjetas` (`numero_tarjeta`, `fecha_vencimiento`, `cvv`, `id_usuario`) VALUES ('8901234567890123', '2027-01-31', 890, 8);
INSERT INTO `pruebas`.`tarjetas` (`numero_tarjeta`, `fecha_vencimiento`, `cvv`, `id_usuario`) VALUES ('9012345678901234', '2025-05-31', 901, 9);
INSERT INTO `pruebas`.`tarjetas` (`numero_tarjeta`, `fecha_vencimiento`, `cvv`, `id_usuario`) VALUES ('0123456789012345', '2026-02-28', 012, 10);

-- Inserts para la tabla tipo_transaccion
INSERT INTO `pruebas`.`tipo_transaccion` (`descripcion`) VALUES ('credito');
INSERT INTO `pruebas`.`tipo_transaccion` (`descripcion`) VALUES ('debito');
INSERT INTO `pruebas`.`tipo_transaccion` (`descripcion`) VALUES ('transferencia');
INSERT INTO `pruebas`.`tipo_transaccion` (`descripcion`) VALUES ('pago');

-- Inserts para la tabla transacciones
INSERT INTO `pruebas`.`transacciones` (`monto`, `descripcion`, `id_tipo`, `id_tarjeta`) VALUES (1000, 'Compra en tienda', 1, 1);
INSERT INTO `pruebas`.`transacciones` (`monto`, `descripcion`, `id_tipo`, `id_tarjeta`) VALUES (500, 'Retiro en cajero', 2, 2);
INSERT INTO `pruebas`.`transacciones` (`monto`, `descripcion`, `id_tipo`, `id_tarjeta`) VALUES (2000, 'Pago de servicios', 1, 3);
INSERT INTO `pruebas`.`transacciones` (`monto`, `descripcion`, `id_tipo`, `id_tarjeta`) VALUES (800, 'Compra en línea', 1, 4);
INSERT INTO `pruebas`.`transacciones` (`monto`, `descripcion`, `id_tipo`, `id_tarjeta`) VALUES (1500, 'Transferencia', 2, 5);
INSERT INTO `pruebas`.`transacciones` (`monto`, `descripcion`, `id_tipo`, `id_tarjeta`) VALUES (300, 'Pago de restaurante', 1, 6);
INSERT INTO `pruebas`.`transacciones` (`monto`, `descripcion`, `id_tipo`, `id_tarjeta`) VALUES (1200, 'Retiro en cajero', 2, 7);
INSERT INTO `pruebas`.`transacciones` (`monto`, `descripcion`, `id_tipo`, `id_tarjeta`) VALUES (900, 'Compra en supermercado', 1, 8);
INSERT INTO `pruebas`.`transacciones` (`monto`, `descripcion`, `id_tipo`, `id_tarjeta`) VALUES (600, 'Pago de servicios', 1, 9);
INSERT INTO `pruebas`.`transacciones` (`monto`, `descripcion`, `id_tipo`, `id_tarjeta`) VALUES (1800, 'Compra en tienda', 1, 10);