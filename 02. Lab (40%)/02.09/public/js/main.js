document.addEventListener("submit", function () {
	let isPrime = document.getElementById("isPrime");
	let number = isPrime.value;
	// console.log(number);
	if (number == '' || number == null) {
		document.getElementById("error").innerHTML = "Error! No number submitted";
	}
	else {
		document.getElementById("error").innerHTML = "";
		let li = document.createElement("li");
		function helper() {
			if (number <= 1) return false;
			for (let i = 2; i <= number / 2; i++) {
				if (number % i == 0) return false;
			}
			return true;
		}
		if (helper()) {
			li.innerHTML = `${number} is a prime number`;
			li.setAttribute("class", "is-prime");
		}
		else {
			li.innerHTML = `${number} is NOT a prime number`;
			li.setAttribute("class", "not-prime");
		}
		document.getElementById("attempts").appendChild(li);
	}
	isPrime.value = null;
});