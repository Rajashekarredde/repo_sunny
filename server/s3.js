const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = "etsyclone"
const region = "us-east-1"
const accessKeyId = "AKIAVL7SL7OTTDFK3UMA"
const secretAccessKey = "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"

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// uploads a file to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }

  return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile


// downloads a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream