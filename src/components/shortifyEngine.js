class Shortify {
    constructor(name, url, status) {
        this.name = name
        this.url = url
        this.statusCode = status
        this.clicks = 0
    }

    getName() {
        return this.name
    }
    getUrl() {
        return this.url
    }
    isLive() {
        if (this.statusCode === 200) {
            return "Website is live"
        }
    }
    getClicks() {
        return this.clicks
    }

    init (link) {
        this.smallLink = link
    }
}

export default Shortify;