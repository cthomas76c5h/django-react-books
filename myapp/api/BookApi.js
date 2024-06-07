export async function postBook(book) {
    try {
      const resp = await fetch('http://192.168.1.54:8000/books/',
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(book)
        }
      );
      const backendResp = await resp.json();
      console.log(backendResp);
    } catch (e) {
      console.log(e);
    }
};

export async function deleteBook(book) {
    try {
      await fetch(`http://192.168.1.54:8000/books/${book.id}/`,
        {
          method: 'DELETE',
        },
      );
    } catch (e) {
      console.log(e);
    }
};

export async function putBook(book) {
    try {
      const resp = await fetch(`http://192.168.1.54:8000/books/${book.id}/`,
        {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(book)
        }
      );
      const backendResp = await resp.json();
      console.log(backendResp);
    } catch (e) {
      console.log(e);
    }
};
