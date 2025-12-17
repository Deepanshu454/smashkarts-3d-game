/**
 * SMASH KARTS 3D - HUD Manager
 * In-game UI overlay management
 */

class HUDManager {
    constructor() {
        // Element references
        this.elements = {
            rankPos: document.getElementById('rank-pos'),
            healthFill: document.getElementById('health-fill'),
            healthText: document.getElementById('health-text'),
            timerText: document.getElementById('timer-text'),
            roundNum: document.getElementById('round-num'),
            leaderboardList: document.getElementById('leaderboard-list'),
            killfeed: document.getElementById('killfeed'),
            weaponIcon: document.getElementById('weapon-icon'),
            weaponName: document.getElementById('weapon-name'),
            weaponAmmo: document.getElementById('weapon-ammo'),
            notification: document.getElementById('notification'),
            fpsCounter: document.getElementById('fps-counter')
        };

        // State
        this.killMessages = [];
        this.maxKillMessages = 5;
    }

    /**
     * Update health display
     */
    updateHealth(current, max = 100) {
        const percentage = (current / max) * 100;

        if (this.elements.healthFill) {
            this.elements.healthFill.style.width = `${percentage}%`;

            // Change color based on health level
            this.elements.healthFill.classList.remove('low', 'critical');
            if (percentage <= 25) {
                this.elements.healthFill.classList.add('critical');
            } else if (percentage <= 50) {
                this.elements.healthFill.classList.add('low');
            }
        }

        if (this.elements.healthText) {
            this.elements.healthText.textContent = `${Math.round(percentage)}%`;
        }
    }

    /**
     * Update timer display
     */
    updateTimer(seconds) {
        if (this.elements.timerText) {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            this.elements.timerText.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;

            // Warning colors
            if (seconds <= 30) {
                this.elements.timerText.style.color = '#FF4757';
            } else if (seconds <= 60) {
                this.elements.timerText.style.color = '#FFD700';
            } else {
                this.elements.timerText.style.color = '#fff';
            }
        }
    }

    /**
     * Update rank display
     */
    updateRank(position, total = 12) {
        if (this.elements.rankPos) {
            const suffix = ['st', 'nd', 'rd'][position - 1] || 'th';
            this.elements.rankPos.textContent = `${position}${suffix}`;

            // Color based on rank
            if (position === 1) {
                this.elements.rankPos.style.color = '#7FFF00';
            } else if (position <= 3) {
                this.elements.rankPos.style.color = '#FFD700';
            } else {
                this.elements.rankPos.style.color = '#fff';
            }
        }
    }

    /**
     * Update leaderboard
     */
    updateLeaderboard(players) {
        if (!this.elements.leaderboardList) return;

        // Sort by kills
        const sorted = [...players].sort((a, b) => b.kills - a.kills);

        this.elements.leaderboardList.innerHTML = sorted.slice(0, 8).map((player, i) => `
            <div class="leaderboard-entry ${player.isPlayer ? 'self' : ''}">
                <span class="rank">${i + 1}.</span>
                <span class="name">${player.name}</span>
                <span class="score">${player.kills}</span>
            </div>
        `).join('');
    }

    /**
     * Add kill message
     */
    addKill(killer, victim, weapon = 'unknown') {
        if (!this.elements.killfeed) return;

        const message = document.createElement('div');
        message.className = 'kill-message';
        message.innerHTML = `
            <span class="killer">${killer}</span>
            💥
            <span class="victim">${victim}</span>
        `;

        this.elements.killfeed.prepend(message);
        this.killMessages.unshift(message);

        // Remove old messages
        while (this.killMessages.length > this.maxKillMessages) {
            const old = this.killMessages.pop();
            if (old.parentNode) {
                old.remove();
            }
        }

        // Auto-remove after animation
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
            const index = this.killMessages.indexOf(message);
            if (index > -1) {
                this.killMessages.splice(index, 1);
            }
        }, 4000);
    }

    /**
     * Update weapon display
     */
    updateWeapon(weapon) {
        if (!weapon) {
            if (this.elements.weaponIcon) this.elements.weaponIcon.textContent = '❓';
            if (this.elements.weaponName) this.elements.weaponName.textContent = 'No Weapon';
            if (this.elements.weaponAmmo) this.elements.weaponAmmo.textContent = '--';
            return;
        }

        const icons = {
            machinegun: '🔫',
            rocket: '🚀',
            shotgun: '💥',
            laser: '⚡',
            mine: '💣'
        };

        if (this.elements.weaponIcon) {
            this.elements.weaponIcon.textContent = icons[weapon.type] || '🔫';
        }
        if (this.elements.weaponName) {
            this.elements.weaponName.textContent = weapon.name || weapon.type;
        }
        if (this.elements.weaponAmmo) {
            this.elements.weaponAmmo.textContent = weapon.ammo || '--';
        }
    }

    /**
     * Show center notification
     */
    showNotification(text, type = 'default') {
        if (!this.elements.notification) return;

        this.elements.notification.textContent = text;
        this.elements.notification.className = `notification show ${type}`;

        // Remove after animation
        setTimeout(() => {
            this.elements.notification.classList.remove('show');
        }, 2500);
    }

    /**
     * Update round number
     */
    updateRound(round) {
        if (this.elements.roundNum) {
            this.elements.roundNum.textContent = round;
        }
    }

    /**
     * Show/hide HUD
     */
    setVisible(visible) {
        const hud = document.getElementById('hud');
        if (hud) {
            hud.style.display = visible ? 'block' : 'none';
        }
    }

    /**
     * Reset HUD to initial state
     */
    reset() {
        this.updateHealth(100);
        this.updateTimer(180);
        this.updateRank(12, 12);
        this.updateWeapon(null);
        this.updateRound(1);

        // Clear kill feed
        if (this.elements.killfeed) {
            this.elements.killfeed.innerHTML = '';
        }
        this.killMessages = [];
    }
}

// Export
window.HUDManager = HUDManager;
