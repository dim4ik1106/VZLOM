// $(document).ready(function () {
let hackButton = document.getElementById('hack-button'),
    hackInput = document.getElementById('hack-input'),
    targetId = document.getElementById('target-id'),
    targetName = document.getElementById('target-name'),
    targetAvatar = document.getElementById('target-avatar'),
    progressbar1 = document.getElementById('progress-bar-1'),
    progressbar2 = document.getElementById('progress-bar-2'),
    potentialPasscode = document.getElementById('potential-passcode'),
    vkDomainPattern = 'vk.com/',
    targetLink,
    targetProfileId,
    shortTargetLink,
    targetProfileName,
    targetSurname,
    targetPhoto100,
    targetPhoto200;


$(hackInput).keyup(function (e) {
    if (hackInput.value.length > 0) {
        $(hackInput).css('color', '#000000');
    } else {
        $(hackInput).css('color', '#828282');
    }
});


$(hackButton).click(function (e) {
    e.preventDefault();
    if (hackInput.value.includes(vkDomainPattern)) {
        $('.start-hack').hide();
        $('.hack-started').show();
        $('.hack-started').css('display', 'flex');

        targetLink = hackInput.value;

        if (targetLink.includes('https://')) {
            targetLink = targetLink.replace('https://', '');
        }
        if (targetLink.includes('/id')) {
            targetLink.replace('/id', '/');
        }

        targetProfileId = targetLink.replace('vk.com/', '');


        $.ajax({
            type: "GET",
            url: "https://api.vk.com/method/users.get?user_ids=" + targetProfileId + "&fields=first_name,last_name,photo_200,photo_100,id&v=5.52&access_token=2f9bcda82f9bcda82f9bcda8432fea7fb422f9b2f9bcda8712999cd850662d39b49be4a",
            dataType: "JSONP",
            success: function (data) {
                targetProfileId = data.response[0].id,
                targetProfileName = data.response[0].first_name,
                targetSurname = data.response[0].last_name,
                targetPhoto100 = data.response[0].photo_100,
                targetPhoto200 = data.response[0].photo_200;

                targetName.innerHTML = targetProfileName + ' ' + targetSurname + ' (id=' + targetProfileId + ')';
                targetAvatar.src = targetPhoto200;
            }
        });


        targetId.innerHTML = targetLink;
        progressPlusOne(progressbar1, 80);
        setTimeout(progressPlusOne, 3000, progressbar2, 120);
    }
});






function progressPlusOne(bar, speed) {
    var width = 1;
    var interval = setInterval(frame, speed);

    function frame() {
        if (width >= 100) {
            clearInterval(interval);
        } else {
            width++;
            bar.style.width = width + '%';
        }
    }
}

function makeRand(max) {
    return Math.floor(Math.random() * max);
}

function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function generatePass() {
    var length = randomInteger(5, 15);
    var result = '';

    var symbols = new Array(
        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
        'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
        'z', 'x', 'c', 'v', 'b', 'n', 'm',
        'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
        'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
        'Z', 'X', 'C', 'V', 'B', 'N', 'M',
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
        '-', '_', '!'
    );
    for (i = 0; i < length; i++) {
        result += symbols[makeRand(symbols.length)];
    }

    potentialPasscode.innerHTML = result;

    setTimeout('generatePass()', 20);
}

generatePass();
// });