<script>
  import { REPO_NEW_ISSUE_URL } from '../constant.js'
</script>

<style>
  .illustration {
    max-width: 500px;
  }
</style>

<div class="row justify-content-center mt-5">
  <h3 class="text-center text-muted mb-4">
    Maaf, sepertinya data belum tersedia
  </h3>
  <p class="text-center text-muted pl-5 pr-5 mb-5">
    Coba cari data lainnya atau bantu kami menambahkan data baru kalau menurut
    kamu seharusnya data ini ada.
  </p>
  <div class="mb-5 text-center">
    <a
      class="btn btn-primary btn-lg"
      href={REPO_NEW_ISSUE_URL}
      target="_blank"
      rel="noopener noreferrer">
      Saya mau tambahkan data
    </a>
  </div>
  <img
    class="illustration pl-5 pr-5 mb-5"
    src="https://phpid-jakarta.github.io/ajari-koding/images/empty-state.png"
    alt="Empty State" />
</div>
