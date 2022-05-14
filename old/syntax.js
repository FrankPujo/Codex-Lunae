function selectSyntax() {
    var selector = document.getElementById('lang-chooser')
    var synLang = selector.value
    return synLang
}

document.getElementById('change').innerHTML = 'Changed now!'
