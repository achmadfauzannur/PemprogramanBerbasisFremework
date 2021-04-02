import React from "react";

const PostKeranjang = (brg) => {
    return (
                <tr>
                    <td align="center">{brg.no}</td>
                    <td align="center">{brg.id}</td>
                    <td>{brg.nama}</td>
                    <td align="center">{brg.harga}</td>
                    <td align="center">{brg.jumlah}</td>
                    <td align="center">{brg.harga * brg.jumlah}</td>
                </tr>
    )
}

export default PostKeranjang;