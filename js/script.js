
const record = document.getElementById('record');
const shot = document.getElementById('shot');
const hit = document.getElementById('hit');
const dead = document.getElementById('dead');
const enemy = document.getElementById('enemy');
const again = document.getElementById('again');
const header = document.querySelector('.header');
let noClick = true;

const game = {
    ships: [
        {
            locatoin: ['10', '20', '30', '40'],
            hit: ['', '', '', '']
        },
        {
            locatoin: ['23', '33', '43'],
            hit: ['', '', '']
        },
        {
            locatoin: ['75', '76'],
            hit: ['', '']
        },
        {
            locatoin: ['89'],
            hit: ['']
        }
    ],
    shipCount: 4,
}

const play = {
    record: localStorage.getItem('seaRecord') || 0,
    shot: 0,
    hit: 0,
    dead: 0,
    set updata(data) {
        this[data] += 1;
        this.render();
    },
    render() {
        record.textContent = this.record;
        shot.textContent = this.shot;
        hit.textContent = this.hit;
        dead.textContent = this.dead;
    },
};

const show = {
    hit(elem) {
        this.changeClass(elem, 'hit');
    },

    miss(elem) {
        this.changeClass(elem, 'miss');
    },

    dead(elem) {
        this.changeClass(elem, 'dead');
    },

    changeClass(elem, value) {
        elem.className = value;
    },
}

const fire = (event) => {
    const target = event.target;
    if (target.tagName !== 'TD' || target.classList.length > 0 || !noClick) return;
    show.miss(target);
    play.updata = 'shot';

    for (let i = 0; i < game.ships.length; i++) {
        const ship = game.ships[i];
        const index = ship.locatoin.indexOf(target.id);
        if (index >= 0) {
            show.hit(target);
            play.updata = 'hit';
            ship.hit[index] = 1;
            const life = ship.hit.indexOf('');
            if (life < 0) {
                play.updata = 'dead';
                for (const id of ship.locatoin) {
                    show.dead(document.getElementById(id));
                }
                game.shipCount -= 1;
                if (game.shipCount < 1) {
                    noClick = false;
                    header.textContent = 'game over';
                    header.style.color = 'red';

                    if (play.shot < play.record || play.record === 0) {
                        localStorage.setItem('seaRecord', play.shot);
                        play.record = play.shot;
                        play.render();
                    }
                }

            }
        }
    }

};

const init = () => {
    enemy.addEventListener('click', fire);
    play.render();

    again.addEventListener('click', () => {
        location.reload();
    });
}
init();