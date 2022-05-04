const itemlist = document.querySelector(".item-list");
const input    = document.querySelector("#input");
const items    = itemlist.children;

if (localStorage.getItem("item-list") !== null) 
{
	let arr = JSON.parse(localStorage.getItem("item-list"));

	arr.forEach((elem) => {
		itemlist.appendChild(createLi(elem.text, 
			elem.status === "Completed" ? "done" : undefined
		));
	});
}
else
	localStorage.setItem("item-list", "[]");

// Helpers Functions
function createI(cls)
{
	const i = document.createElement('i');
	i.classList.add('fa');
	i.classList.add(cls);
	i.ariaHidden = "true";
	return i;
}

function createBtn(cls)
{
	const btn = document.createElement('button');
	btn.classList.add(cls);
	return btn;
}

function createLi(text, cls)
{
	const li = document.createElement('li');
	const p  =  document.createElement('p');
	
	p.innerText = text;

	input.value = "";
	li.appendChild(p);

	const btn1 = createBtn('button-check');
	btn1.appendChild(createI('fa-check'));

	btn1.addEventListener('click', (event) => {
		let elem;

		if (event.target.tagName === 'I')
			elem = event.target.parentElement.parentElement;
		else
			elem = event.target.parentElement;


		let length = elem.parentElement.children.length;
		let items  = elem.parentElement.children;
		
		for (let i = 0; i < length; ++ i)
			if (elem === items[i] && !elem.classList.contains('done'))
				changeStatus(i, "Completed");
			else if (elem === items[i])
				changeStatus(i, "Uncompleted");
			
		elem.classList.toggle('done');
	});


	const btn2 = createBtn('button-trash');
	btn2.appendChild(createI('fa-trash'));

	btn2.addEventListener('click', (event) => {
		console.log('click');

		let elem;

		if (event.target.tagName === 'I')
			elem = event.target.parentElement.parentElement;
		else
			elem = event.target.parentElement;


		let length = elem.parentElement.children.length;
		let items  = elem.parentElement.children;
		
		
		
		elem.classList.add('remove');

		
		elem.addEventListener('transitionend', () => {
			for (let i = 0; i < length; ++ i)
				if (elem === items[i])
				{
					removeItem(i);
					break;
				}	
			
			elem.remove();
		});
	});


	li.appendChild(btn1);
	li.appendChild(btn2);

	if (cls)
		li.classList.add(cls);

	return li;
}

// LocalStorage Functions
function addItem(text, status)
{
	let arr = JSON.parse(localStorage.getItem('item-list'));

	arr.push({
		text: text,
		status: status
	});

	localStorage.setItem('item-list', JSON.stringify(arr));

}

function changeStatus(index, status)
{
	let arr = JSON.parse(localStorage.getItem('item-list'));

	arr[index].status = status;

	localStorage.setItem('item-list', JSON.stringify(arr));
}

function removeItem(index)
{
	let arr = JSON.parse(localStorage.getItem('item-list'));

	arr.splice(index, 1);

	localStorage.setItem('item-list', JSON.stringify(arr));
}


// Events
document.querySelector('select').addEventListener('change', function(event) {
	if (event.target.value == 'All')
	{
		for (item of items)
			item.style.display = "block";
	
	}
	else if (event.target.value == 'Completed')
	{
		for (item of items)
			if (item.classList.contains('done'))
				item.style.display = "block";
			else
				item.style.display = "none";
	}
	else
	{
		for (item of items)
			if (!item.classList.contains('done'))
				item.style.display = "block";
			else
				item.style.display = "none";
	}
});

document.querySelector("button").addEventListener("click", (event) => {
	event.preventDefault();
	let text = input.value;

	itemlist.appendChild(createLi(text));
	addItem(text, "Uncompleted");
});