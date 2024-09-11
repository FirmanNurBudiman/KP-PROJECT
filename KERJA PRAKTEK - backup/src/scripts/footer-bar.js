class FooterBar extends HTMLElement {
    _shadowRoot = null;
    _style = null;

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: "open" });
        this._style = document.createElement("style");
    }

    _updateStyle() {
        this._style.textContent = `
.footer-distributed {
    background-color: #181619;
    color: #ffffff;
    padding: 50px 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    text-align: left;
    margin-top: 50px;
}

.footer-distributed .footer-left,
.footer-distributed .footer-center,
.footer-distributed .footer-right {
    flex: 1;
    min-width: 250px;
    margin: 10px;
}

.footer-distributed .footer-left h3 {
    font: normal 36px 'Lobster';
    margin: 0;
    color: #ffffff;
}

.footer-distributed .footer-left h3 span {
    color: #e0ac1c;
}

.footer-distributed .footer-links {
    margin: 20px 0;
}

.footer-distributed .footer-links a {
    display: inline-block;
    line-height: 1.8;
    text-decoration: none;
    color: #ffffff;
    margin: 0 10px;
}

.footer-distributed .footer-company-name {
    font-size: 14px;
    color: #8f9296;
}

.footer-distributed .footer-center i {
    background-color: #33383b;
    color: #ffffff;
    font-size: 25px;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    text-align: center;
    line-height: 38px;
    margin-right: 15px;
    vertical-align: middle;
}

.footer-distributed .footer-center p {
    display: inline-block;
    color: #ffffff;
    vertical-align: middle;
    margin: 0;
}

.footer-distributed .footer-center p a {
    color: #e0ac1c;
    text-decoration: none;
}

.footer-distributed .footer-right p {
    color: #92999f;
    font-size: 13px;
}

.footer-distributed .footer-company-about span {
    display: block;
    color: #ffffff;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
}

.footer-distributed .footer-icons {
    margin-top: 25px;
}

.footer-distributed .footer-icons a {
    display: inline-block;
    width: 35px;
    height: 35px;
    cursor: pointer;
    background-color: #ffffff;
    border-radius: 2px;
    font-size: 20px;
    text-align: center;
    line-height: 35px;
    margin-right: 3px;
    margin-bottom: 5px;
}

.footer-distributed .footer-icons img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    color: #ffffff;
}

.footer-distributed .footer-icons a:hover {
    background-color: #e0ac1c;
}

.footer-links a:hover {
    color: #e0ac1c;
}
    `;
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = "";
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this._emptyContent();
        this._updateStyle();

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `      
        <footer class="footer-distributed">

            <div class="footer-left">
                <h3><span>BITC</span></h3>

                <p class="footer-links">
                    <a href="./index.html">Home</a>
                    |
                    <a href="./contact-section.html">Complaints</a>
                    |
                    <a href="#">Live Chat</a>
                    |
                    <a href="./callcenter.html">Call Center</a>
                </p>

                <p class="footer-company-name">Copyright © 2024<strong> TechnoFeedbackHub</strong> All rights reserved</p>
            </div>

            <div class="footer-center">
                <div>
                    <i class="fa fa-phone"></i>
                    <a href="tel:02286121025">
                    <p>(022) 86121025</p>
                </div>
                <div>
                    <i class="fa fa-envelope"></i>
                    <p><a href="mailto:technopark@cimahikota.go.id">technopark@cimahikota.go.id</a></p>
                </div>
                <div>
                    <i class="fa fa-map-marker"></i>
                    <p>Jl. HMS Mintareja Sarjana Hukum, Baros, Kec. Cimahi Tengah, Kota Cimahi, Jawa Barat 40521</p>
                </div>
            </div>
            <div class="footer-right">
                <p class="footer-company-about">
                    <span>About the company</span>
                    Baros Information Technology Creative adalah perusahaan teknologi inovatif yang berfokus pada
                    pengembangan solusi IT kreatif.
                    Kami menggabungkan keahlian teknologi dengan pendekatan kreatif untuk membantu klien kami menghadapi
                    tantangan digital modern.
                </p>
                <div class="footer-icons">
                    <a href="https://www.facebook.com/technopark.cimahi"><img src="./icon/facebook.png" alt="Facebook"></a>
                    <a href="https://instagram.com/technopark.cimahi"><img src="./icon/instagram.png" alt="Instagram"></a>
                    <a href="https://twitter.com/cimahitpark"><img src="./icon/twitter.png" alt="Twitter"></a>
                    <a href="https://www.youtube.com/@cimahitechnopark4127"><img src="./icon/youtube.png" alt="YouTube"></a>
                </div>
            </div>
        </footer>
    `;
    }
}

customElements.define("footer-bar", FooterBar);
