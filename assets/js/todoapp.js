const getLiList=(...listItems)=>{let list='';listItems.forEach(element=>{let listItem=document.createElement('li');listItem.innerHTML=`<span><i class="far fa-check-square"></i></span> ${element} <span class="grip"><i class="fas fa-arrows-alt-v"></i></span>`;list+=listItem.outerHTML});return list}
const example=getLiList('Eg. Call The Caterers','Eg. Order Flower Arrangements','Eg. Mail Guest Lists (Urgent)');class UI{static showNotes(){let storedNotes=getNotes()
if(storedNotes.length===0){storedNotes=example}
let list=document.querySelector('.app-container ul');$(list).append(storedNotes)}
static addNoteToList(){document.querySelector("input[type='text']").addEventListener("keyup",(event)=>{if(event.which===13){if(event.target.value.trim()===''){info('You Must Enter Something First!');setTimeout(()=>{$("input[type='text']").removeClass('shake')},401);return}else{$("input[type='text']").removeClass('shake')}
let notes=getNotes();if(notes.length===0){$(".app-container ul").empty();$(".app-container ul").append(getLiList(escapeHtml(event.target.value)));saveState();return}
$(".app-container ul").append(getLiList(escapeHtml(event.target.value)));saveState();$(".app-container ul").empty();UI.showNotes();event.target.value=""}})}}
const getNotes=()=>{let notes;if(localStorage.getItem('notes')==null){notes=[]}else{notes=localStorage.getItem('notes')}
return notes}
const saveState=()=>{let notes=$(".app-container ul").html().trim()
localStorage.setItem('notes',notes)}
$(()=>{$(".list-group").sortable({handle:".grip",forcePlaceholderSize:!0,placeholder:"place-holder"});$(".list-group").disableSelection()});$(".save-button").on("click",(event)=>{saveState()});document.addEventListener('DOMContentLoaded',UI.showNotes);$(".drop-down-entry").click(()=>{$("input[type='text']").fadeToggle()
$("input[type='text']").removeClass('shake')})
UI.addNoteToList();$(".app-container ul").on("click","li",(event)=>{let strikedListItem=$(event.target);$(event.target.querySelector('span')).toggleClass('clickedLi');saveState();event.stopPropagation()});$(".app-container ul").on("click","span",(event)=>{$(' ul > li > span.clickedLi').parent().toggleClass('completed');$(' ul > li > span.clickedLi').parent().fadeOut(800,()=>{$(' ul > li > span.clickedLi').parent().remove();saveState();let notes=getNotes();if(notes.length===0){$(".app-container ul").empty();UI.showNotes()}})
event.stopPropagation()})
const escapeHtml=(text)=>{var map={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'};return text.replace(/[&<>"']/g,function(m){return map[m]})}
const info=(message)=>{$("input[type='text']").addClass('shake')
$('#logo').attr("src","assets/img/oops.png")
$('#info-message').text(message);$(document).scrollTop(0);$('#info-bubble').css('visibility','visible');setTimeout(()=>{$('#info-bubble').css('visibility','hidden');$('#logo').attr("src","assets/img/cwc.svg")},3000)}