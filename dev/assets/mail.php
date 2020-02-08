<?php
	$recipient = "hi@andrew.studio";
	$subject = "JungleBeige.com | New message";
	$name = $_POST['form-name'];
	$email = $_POST['form-email'];
	$message = $_POST['form-textarea'];
	$checkbox = $_POST['form-checkbox'];
	$formcontent="Hi there, this is a new email written by a user through your official website junglebeige.com; here is what they say:\n\nName: $name \nEmail address: $email\nMessage: $message";
	$mailheader = "From: $email \r\n";
	
	if($subject == false || $name == false || $email == false || $message == false || $checkbox == false){
		$mail_sent = false;
		
		?>

		<script type="text/javascript">
			alert("We can't send the message with blank fields, please fill the fields required.");
			window.location.reload();
		</script>

		<?php
	} else {
		$mail_sent = mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");
		if ($mail_sent == true){ ?>
			<script language="javascript" type="text/javascript">
				alert('Great! Your message was sent successfully.');
				window.location = './';
			</script>

		<?php 
		} else { 
		?>

			<script type="text/javascript">
				alert('There was an error and the message could not be sent, try again and if the error persists, try to reach us on our social media channels.');
				window.location = './';
			</script>
		
		<?php 
		} 
	}	
?>