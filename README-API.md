<a name="top"></a>
# Semver Resource Service v0.1.0

Microservicio de Recursos

- [Documents](#documents)
	- [Add Document Version](#add-document-version)
	- [Retrive document](#retrive-document)
	- [Delete the semver version](#delete-the-semver-version)
	


# <a name='documents'></a> Documents

## <a name='add-document-version'></a> Add Document Version
[Back to top](#top)

<p>Adds ad version to the document.</p>

	POST /resources/:project/:language/:semver



### Examples

Body

```
[
 {
   "key" : "example_text",
   "value" : "Hello World",
 }, 
 ...
]
```


### Success Response

{ &quot;sermver&quot;: &quot;version&quot;} Version added

```
HTTP/1.1 200 OK
```


### Error Response

400 Bad Request

```
HTTP/1.1 400 Bad Request
{
   "messages" : [
     {
       "path" : "{Nombre de la propiedad}",
       "message" : "{Motivo del error}"
     },
     ...
  ]
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
{
   "error" : "Not Found"
}
```
## <a name='retrive-document'></a> Retrive document
[Back to top](#top)

<p>Fetch document.</p>

	GET /resources/:project/:language/:semver





### Success Response

Document

```
HTTP/1.1 200 OK
```


### Error Response

400 Bad Request

```
HTTP/1.1 400 Bad Request
{
   "messages" : [
     {
       "path" : "{Nombre de la propiedad}",
       "message" : "{Motivo del error}"
     },
     ...
  ]
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
{
   "error" : "Not Found"
}
```
## <a name='delete-the-semver-version'></a> Delete the semver version
[Back to top](#top)

<p>Remove ad version to the document.</p>

	DELETE /resources/:project/:language/:semver





### Success Response

{ &quot;sermver&quot;: &quot;version&quot;} Version removed

```
HTTP/1.1 200 OK
```


### Error Response

400 Bad Request

```
HTTP/1.1 400 Bad Request
{
   "messages" : [
     {
       "path" : "{Nombre de la propiedad}",
       "message" : "{Motivo del error}"
     },
     ...
  ]
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
{
   "error" : "Not Found"
}
```
