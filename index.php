<?php 
	// 2017-0528-1940
	// Needed for Heroku framework, to fool it since it runs in PHP
	// But it not seems to work fully.  It does load index.html but block are corrupted like in the past
	header( 'Location: /ardublockly/index.html' ) ;  
?>
