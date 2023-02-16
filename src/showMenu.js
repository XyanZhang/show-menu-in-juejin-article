window.onload = function () {
  // 使用setTimeout是为了等待页面加载完毕，否则会报错，因为页面还没有加载完毕，就去获取元素了
  setTimeout(function () {
    // var menu = document.querySelector('.markdown-body');
    // var menuItems = menu.getElementsByTagName('h2');
    // for (var i = 0; i < menuItems.length; i++) {
    //   menuItems[i].onmouseover = function () {
    //     this.className += ' over';
    //   };
    //   menuItems[i].onmouseout = function () {
    //     this.className = this.className.replace(' over', '');
    //   };
    // }
    let h2Dom = findH2Dom()
    addHtmlToBody(createDom(h2Dom))
    aButtonCanDraggable();

    addClickEvent(document.querySelector('.title-list'));
  }, 2000);
};

function findH2Dom() {
  var menu = document.querySelector('.markdown-body');
  var menuItems = menu.querySelectorAll("h2, h3"); // nodeName
  return menuItems;
}

function addHtmlToBody(htmlStr) {
  $('body').append(htmlStr)
}
function createDom(hDom) {
  let liList = ''
  
  Array.from(hDom).forEach(h => {
    let nodeName = h.nodeName
    console.log($(h)[0])
    if(nodeName === 'H2') {
      liList += `<li class="h2-title">${h.innerHTML}</li>`
    }
    if(nodeName === 'H3') {
      liList += `<li class="h3-title">${h.innerHTML}</li>`
    }
  });
  let ulContain = document.createElement('ul');
  ulContain.className = 'title-list' //  display-none
  ulContain.innerHTML = liList
  const imgUrl = chrome.extension.getURL("icon/menu.png"); // 获取插件资源路径
  let htmlStr =  `<div id="buttonDiv">
                    <img src=${imgUrl} class="menu-icon"></img>
                    ${ulContain.outerHTML}
                  </div>`
  return htmlStr;
}

function addClickEvent(ulContain) {
  ulContain.addEventListener('click', function (e) {
    let target = e.target;
    let targetDom = $('h2, h3').eq($(target).index());
    targetDom[0].scrollIntoView();
  })
}
function aButtonCanDraggable() {
  let div = document.querySelector('#buttonDiv');
  div.onmousedown = function (event) {
    let offsetX = event.offsetX;
    let offsetY = event.offsetY;
    document.onmousemove = function (event) {
      // throttle performance
      if (
        event.clientX - offsetX < 0 ||
        event.clientX - offsetX > window.innerWidth - div.offsetWidth
      ) {
        return;
      }
      div.style.left = event.clientX - offsetX + 'px';
      div.style.top = event.clientY - offsetY + 'px';
    };
    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };
  $('.menu-icon').on('click', function (event) {
    event.stopPropagation();
    $(this).siblings('.title-list').toggleClass('display-none');
    $(this).equals
  });
}
