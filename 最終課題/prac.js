"use strict";

const save_btn = document.getElementById('save_btn');
save_btn.addEventListener('click', function () {
  const textarea = document.getElementById('text');
  const text = textarea.value.trim();
  if (text) {
    const memos = JSON.parse(localStorage.getItem('memos')) || [];
    memos.push(text);
    localStorage.setItem('memos', JSON.stringify(memos));
    textarea.value = '';
    displayMemos();
  } else {
    alert('文字を入力してください。');
  }
})


function displayMemos() {
  const memos = JSON.parse(localStorage.getItem('memos')) || [];
  const memo_list = document.getElementById('memo_list');
  memo_list.replaceChildren();
  memos.forEach(function (memo, index) {
    const li = document.createElement('li');
    li.textContent = memo;

    const h4 = document.createElement('h4');
    h4.textContent = '';
    li.appendChild(h4);

    const button = document.createElement('button');
    button.textContent = '削除';
    button.setAttribute('id', `del_btn_${index}`);
    button.classList.add('delete-btn');
    li.appendChild(button);

    button.addEventListener('click', function () {
      memos.splice(index, 1);
      localStorage.setItem('memos', JSON.stringify(memos));
      displayMemos();
    })
    memo_list.appendChild(li);

    const p = document.createElement('p');
    p.textContent = '---------------------------'
    li.appendChild(p);
  });
} 

displayMemos();

// すべて削除
const all_del = document.getElementById('all_del_btn');
all_del.addEventListener('click', function () {
  localStorage.clear();
  const memo_list = document.getElementById('memo_list');
  memo_list.replaceChildren()
});

// ダークモード      
const change_color = document.getElementById('change_color');
change_color.addEventListener('click', function(){
  document.body.classList.toggle('dark_mode')
});

// キーイベント
const textarea = document.getElementById('text');
textarea.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // デフォルトの動作を防ぐ
    save_btn.click(); // save_btnのクリックイベントを発生させる
  }
});
