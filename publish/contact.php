<?php
/**
 * Contact file
 * @author Joan Fernandez <joan(at)joanfernandez(dot)es>
 *
 */
$_name = utf8_encode($_POST['name']);
$_email = utf8_encode($_POST['email']);
$_comment = utf8_encode($_POST['comment']);

// multiple recipients
$to = 'joan@joanfernandez.es';

// subject
$subject = 'Nuevo mensaje de '.$_name.' desde formulario de contacto';

// message
$message = '
<html>
<head>
  <title>Nuevo mensaje de $_name</title>
</head>
<body>
  <h1>Nuevo mensaje desde contacto</h1>
  <dl>
  	<dt><strong>Nombre</strong></dt>
  	<dd>$_name</dd>

  	<dt><strong>Correo</strong></dt>
  	<dd>$_email</dd>

  	<dt><strong>Comentario</strong></dt>
  	<dd>$_comment</dd>
  </dl>
</body>
</html>
';

// To send HTML mail, the Content-type header must be set
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";

// Additional headers
$headers .= 'From: no-reply@joanfernandez.es' . "\r\n";
$headers .= "Reply-To: $_email\r\n";

// Mail it
$_msg = ( mail($to, $subject, $message, $headers) ) ? 'Message sent' : 'Error sending the message. Try again later.';

print $_msg;