import React, { Component } from "react";
import './KipasAngin.css';
import Post from "../../component/KipasAngin/Post";

class KipasAngin extends Component {
    state = {
        listKipasAngin: []
    }

    ambilDataDariServerAPI = () => {
        fetch('http://localhost:3001/KipasAngin')
            .then(response => response.json())
            .then(jsonHasilAmbilDariAPI => {
                this.setState({
                    listKipasAngin: jsonHasilAmbilDariAPI
                })
            })
    }

    componentDidMount() {
        this.ambilDataDariServerAPI()
    }

    handleGetKipasAngin = data => {
        fetch(`http://localhost:3001/KipasAngin/${data}`, { method: "GET" })
            .then(response => response.json())
            .then(res => {
                // this.handleUpdateList(data, res);
                var dataKipasAngin = { ...this.state.insertKeranjang };
                dataKipasAngin["id"] = res["id"];
                dataKipasAngin["nama"] = res["nama"];
                dataKipasAngin["harga"] = res["harga"];
                dataKipasAngin["stok"] = res["stok"];
                dataKipasAngin["jumlah"] = 1;
                this.setState({
                    insertKeranjang: dataKipasAngin
                });
            })
            .then(() => {
                this.handleCekKeranjang(data);
            })
            .then(() => {
                this.handleTombolSimpan();
            });
    };

    handleCekKeranjang = data => {
        fetch(`http://localhost:3002/keranjang/${data}`, { method: "GET" }).then(
            response => {
                if (response.ok) {
                    response.json().then(res => {
                        this.handleUpdateKeranjang(data, res);
                        this.ambilDataDariServerAPI();
                    });
                } else {
                    this.handleTombolSimpan();
                }
            }
        );
    };

    handleUpdateKeranjang = (data, res) => {
        fetch(`http://localhost:3002/keranjang/${data}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: res["id"],
                nama: res["nama"],
                harga: res["harga"],
                stok: res["stok"],
                jumlah: res["jumlah"] + 1
            })
        });
    };

    handleTombolSimpan = () => {
        fetch('http://localhost:3002/keranjang', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.insertKeranjang)
        })
            .then((Response) => {
                this.ambilDataDariServerAPI();
            });
    }

    render() {
        return (
            <div className="post-KipasAngin">
                {
                /* <div className="form pb-2 border-bottom">
                    <button type="submit" className="btn btn-primary" onClick={this.handleTombolSimpan}>Simpan</button>
                </div> */}
                <center><h2>Daftar Barang</h2></center>
                <div className="tgh">
                    {
                        this.state.listKipasAngin.map(KipasAngin => {
                            return (
                                <Post
                                    key={KipasAngin.id}
                                    id={KipasAngin.id}
                                    nama={KipasAngin.nama}
                                    harga={KipasAngin.harga}
                                    gambar={KipasAngin.gambar}
                                    stok={KipasAngin.stok}
                                    tambahKipasAngin={this.handleGetKipasAngin} />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default KipasAngin;