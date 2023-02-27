import { useEffect, router } from "../../utilities";
import { addProducts } from "../../api/products";
import { string, object, number } from "yup";

const projectSchema = object({
  productName: string().required("Tên không được để trống"),
  brand: number().required("Thương hiệu không được để trống, va phai laf so"),
})


const productAdd = () => {
  useEffect(() => {
    const form = document.getElementById('form-add');
    const productName = document.getElementById('product-name');
    const productCat = document.getElementById('product-cat');
    const productBrand = document.getElementById('product-brand');
    const productImage = document.getElementById('product-img');


    //thêm sp
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = {
        productName: productName.value,
        cat: productCat.value,
        brand: productBrand.value,
        image: productImage.value
      };
      projectSchema
        .validate(formData, { abortEarly: false })
        .then(() => {
          window.confirm("Thêm thành công");
          addProducts(formData).then(() => router.navigate("/"));
        })
        .catch((error) => {
          const formErrorEl = document.querySelectorAll(".form-error");
          formErrorEl.forEach((element, index) => {
            element.innerHTML = error.errors[index];
          });
        });
    });
  });


  return /*html*/ `
 
  <div class="container">
       
  <h1>Thêm sản phẩm</h1>
  <form action="" id="form-add">
    <div class="form-group mb-3">
      <label for="">Tên sản phẩm</label>
      <input type="text" id="product-name" class="form-control">
      <div class="form-error text-danger" ></div>
     
    </div>
    <div class="form-group" >
      <label for="">Danh mục sản phẩm</label>
      <select name="" id="product-cat">
      <option selected>Chọn danh mục</option>
      <option value="1">Iphone</option>
      <option value="2">SamSung</option>
      <option value="3">Xiaomi</option>
      <option value="4">Oppo</option>
    </select>
    </div>
    <div class="form-group">
      <label for="">Thương hiệu</label>
      <input type="text" id="product-brand" class="form-control">
      <div class="form-error text-danger "></div>
    </div>
    <div class="form-group">
      <label for="">Hình ảnh</label>
      <input type="file" id="product-img"class="form-control" multiple>
    </div>

    <br>
    <div>
    <button class="btn btn-primary"> Thêm sản phẩm
   </button>
    </div>
  </form>
  </div>
    `
}

export default productAdd;