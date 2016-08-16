var checkStatus, city;
checkStatus = document.querySelector( '.linkage-top' );
city = document.querySelector( '.city' );

addEvent( checkStatus, 'change', changeStatus );

addEvent( city, 'change', linkage );

function linkage(){

	var data = {
		bj: {
			bjd: '北京大学',
			qhd: '清华大学',
			red: '人民大学'
		},
		sh: {
			jtd: '交通大学',
			fdd: '复旦大学',
			tjd: '同济大学'
		},
		wh: {
			whd: '武汉大学',
			hkd: '华中科技大学',
			hsd: '华中师范大学'
		}
	};

	var city, school, val, newOption;
	city = document.querySelector( '.city' );
	school = document.querySelector( '.school' );
	val = city.options[ city.selectedIndex ].value;

	school.innerHTML = '';

	for( var k in data[ val ] ){
		newOption = document.createElement( 'option' );
		newOption.value = k;
		newOption.textContent = data[ val ][ k ];
		school.appendChild( newOption );
	}

}

function changeStatus(){
	var inSchool, outSchool, oSel1, oSel2;
	inSchool = document.querySelector( '.inSchool' );
	outSchool = document.querySelector( '.outSchool' );
	oSel1 = document.querySelector( '.linkage-bot1' );
	oSel2 = document.querySelector( '.linkage-bot2' );

	if( inSchool.checked ){
		oSel1.className = 'linkage-bot1';
		oSel2.className = 'linkage-bot2 hide';
	} else{
		oSel1.className = 'linkage-bot1 hide';
		oSel2.className = 'linkage-bot2';
	}
}

function addEvent( ele, event, fn ){
	if( ele.addEventListener ){
		ele.addEventListener( event, fn, false );
	} else if( ele.attachEvent ){
		ele.attachEvent( 'on' + event, fn );
	} else{
		ele[ 'on' + event ] = fn;
	}
}