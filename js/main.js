$(document).ready(function () {

	// Параллакс кавычки
	var scene = document.querySelector('#contacts__text');
	var parallax = new Parallax(scene);

	// Мобильное меню

	let navIcon = document.querySelector('.nav-icon');
	let nav = document.querySelector('.nav');
	let overlay = document.querySelector('#overlay');

	navIcon.addEventListener('click', function () {
		this.classList.toggle('nav-icon--active');
		nav.classList.toggle('nav--active');
		overlay.classList.toggle('none');
		document.body.classList.toggle('body--noscroll');
	})

	// находим ссылки внутри мобильной навигации
	let navLinks = document.querySelectorAll('.nav a');
	// обходим ссылки методом forEach
	navLinks.forEach(function (item) {
		// для каждой ссылки добавляем прослушку "клик"
		item.addEventListener('click', function () {
			navIcon.classList.remove('nav-icon--active'); // убираем у * класс *--active
			nav.classList.remove('nav--active'); // убираем у * класс *--active
			overlay.classList.add('none'); // скрываем оверлей
			document.body.classList.remove('body--noscroll'); // включаем скролл
		})
	})

	overlay.addEventListener('click', function () {
		navIcon.classList.remove('nav-icon--active'); // убираем у * класс *--active
		nav.classList.remove('nav--active'); // убираем у * класс *--active
		overlay.classList.add('none'); // скрываем оверлей
		document.body.classList.remove('body--noscroll'); // включаем скролл
	})

	// page nav
	$('#header-menu').onePageNav({
		currentClass: 'active',
		changeHash: false,
		scrollSpeed: 750,
		scrollThreshold: 0.2,
		filter: '',
		easing: 'swing',
	});

	// MixItUp
	let containerEl = document.querySelector('#mix-cards');
	let mixer = mixitup(containerEl, {
		classNames: {
			block: ""
		},
		animation: {
			enable: false
		}
	});

	// Выравнивание карточек по высоте при фильтрации
	// const filterToggles = document.querySelectorAll('.mix-block__btns button');
	// const portfolioBigCards = document.querySelectorAll('.portfolio-card');

	// for (let i = 0; i < filterToggles.length; i++) {
	// 	filterToggles[i].addEventListener('click', function () {
	// 		if (i == 0) {
	// 			for (let j = 0; j < 2; j++) {
	// 				portfolioBigCards[j].classList.add('portfolio-card--big')
	// 			}
	// 		} else {
	// 			for (let j = 0; j < 2; j++) {
	// 				portfolioBigCards[j].classList.remove('portfolio-card--big')
	// 			}
	// 		}
	// 	})
	// }

	// Back to top
	const backTopBtn = document.querySelector('#backtop');

	backTopBtn.style.opacity = 0;

	document.addEventListener('scroll', function () {
		if (window.pageYOffset > 300) {
			backTopBtn.style.opacity = 1;
		} else {
			backTopBtn.style.opacity = 0;
		}
	})



	// Работа формы

	const formItems = document.querySelectorAll('.form__field');
	for (let item of formItems) {
		const formRow = item.closest('.form__row');
		const formPlaceholder = formRow.querySelector('.form__placeholder');
		// если инпут получает фокус
		item.addEventListener('focus', function () {
			formPlaceholder.classList.add('active');
		})
		// если инпут теряет фокус
		item.addEventListener('blur', function () {
			if (item.value.length > 0) {
				formPlaceholder.classList.add('active');
			} else {
				formPlaceholder.classList.remove('active');
			}
		})
	}

	//FORM VALIDATE
	$('#form').validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			message: {
				required: true
			}
		},
		messages: {
			email: {
				required: 'Введите email',
				email: 'отсутствует символ @'
			},
			message: {
				required: 'Поле не должно быть пустым'
			}
		},
		submitHandler: function (form) {
			ajaxFormSubmit();
		}
	});

	// Функция AJAX запрса на сервер

	function ajaxFormSubmit() {

		let string = $("#form").serialize(); // Сохраняем данные введенные в форму в строку.

		//Формируем ajax запрос
		$.ajax({
			type: "POST", // Тип запроса - POST
			url: "php/mail.php", // Куда отправляем запрос
			data: string, // Какие даные отправляем, в данном случае отправляем переменную string

			// Функция если все прошло успешно
			success: function (html) {
				$("#form").slideUp(800);
				$('#answer').html(html);
			}
		});
		// Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
		return false;
	}

})


